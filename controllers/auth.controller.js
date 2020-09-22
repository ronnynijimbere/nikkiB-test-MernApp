const passport = require('passport');
const GoogleStrat = require('passport-google-oauth20').Strategy;
const FacebookStrat = require('passport-facebook').Strategy;
const LocalStrat = require('passport-local').Strategy;
const keys = require('../config/keys');//We have created keys.js to store our sensitive information for our app. This file is added to .gitignore
const User = require('../models/user.model.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        User.findById(id, (err, user) => {
            let clientUser = id;
            if (user != null) {
                clientUser = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    taskLists: user.taskLists
                };
            }
            cb(err, clientUser);
        }).catch(err => cb(null, id));
    } else {
        cb(null, id);
    }
});

//AUTHENTICATION CHECK ---- working
const authCheck = ((req, res, next) => {
    if (!req.user) {
      //if user not logged in
      res.redirect('http://localhost:3000/login');
    } else {
        next();
    }
  });

//REGISTER LOCAL USER --- working
const registerUser = (req, res) => {
    const {username, email, password} = req.body;
    User.findOne({username: req.body.username}, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send('User Already Exists');
        if (!doc) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username: username,
                email: email,
                password: hashedPassword,
                type: 'LOCAL',
                taskLists: [
                    {
                        listName: 'Task List',
                        listItems: [
                            {
                                task: 'Example Task',
                                priority: 1,
                                notes: 'Extra information about the task',
                                completed: false
                            }
                        ]
                    }
                ]
            });
            await newUser.save();
            res.send('User Created');
        } 
      });
};

//LOCAL STRATEGY -- working
passport.use(new LocalStrat((username, password, done) => {
    User.findOne({ email: username, type: 'LOCAL' }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
}));

//GOOGLE STRATEGY -- working
passport.use(new GoogleStrat({
        //options for stratergy
        callbackURL: '/api/login/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile._json.email }).then((currentUser) => {
            if (currentUser) {
                //if we have this user in our db
                done(null, currentUser);
            } else {
                //else save new user to DB 
                new User({
                    username: profile.displayName,
                    email: profile._json.email,
                    type: 'GOOGLE',
                    taskLists: [
                        {
                            listName: 'Task List',
                            listItems: [
                                {
                                    task: 'Example Task',
                                    priority: 1,
                                    notes: 'Extra information about the task',
                                    completed: false
                                }
    
                            ]
                        }
                    ]
    
                }).save().then((user) => {
                    done(null, user);
                }).catch(err => done(err, false));
            }
        });

}));

//FACEBOOK STRATEGY -- working
passport.use(new FacebookStrat({
        //options for stratergy
        callbackURL: 'http://localhost:3001/api/login/facebook/redirect',
        clientID: keys.facebook.appID,
        clientSecret: keys.facebook.appSecret,
        profileFields: ['id', 'emails', 'displayName']
      },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile._json.email, type: 'FACEBOOK' }).then((currentUser) => {
            if (currentUser) {
                //if we have this user in our db
                done(null, currentUser);
            } else {
                //else save new user to DB
                const { email, name } = profile._json;
                const userData = { 
                    username: name, 
                    email: email,
                    type: 'FACEBOOK',
                    taskLists: [
                        {
                            listName: 'Task List',
                            listItems: [
                                {
                                    task: 'Example Task',
                                    priority: 1,
                                    notes: 'Extra information about the task',
                                    completed: false
                                }
    
                            ]
                        }
                    ]
    
                };
                new User(userData).save().then((user) => {
                    done(null, user); 
                }).catch(err => done(err, false));
            }
        });

}));

module.exports = {
    registerUser,
    authCheck
}
