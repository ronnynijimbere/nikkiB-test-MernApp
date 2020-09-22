// In this file, you will create all the code needed to perform CRUD operations using Mongoose. */
const User = require('../models/user.model.js');
const mongoose = require('mongoose');


//Find and LOAD users todo list from MongoDB
exports.findUser = function(req, res) {
    const id = req.user.id
    User.findById(id, function(err, user) {
        if (err) {
            res.status(500).send({ message: "Some error occurred while retrieving User data." });
        } else {
            res.send(user);
        }
    });
}

//Find and UPDATE tasklists
exports.updateTaskLists = function(req, res) {
    const {userId, taskLists } = req.body;

    console.log(userId);
    console.log(taskLists);

    User.findByIdAndUpdate(userId, {taskLists: taskLists}, {new: true}, function(err, doc) {

        if (err) {
            console.log("Something wrong when updating user task lists");
            res.send("ERROR: Not Updated. " + err);
        }  
        res.send(doc);
        console.log('Task Lists updated on server')
    });
} 