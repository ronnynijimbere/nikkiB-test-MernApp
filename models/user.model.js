//User Mongoose Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = mongoose.Schema({
	
	username: {
		type: String,
		required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    taskLists: [
        {
            listName: {
                type: String,
                required: true
            },
            listItems: [
                {
                    task: {
                        type: String,
                        min: 1
                    },
                    priority: {
                        type: Number,
                        required: false
                    },
                    notes: {
                        type: String,
                        required: false        
                    },
                    completed: false
                }, { timestamps: true },
            ]
        }
    ]
}, { timestamps: true });

UserSchema.index({email: 1, type: 1}, {unique: true});

let User = mongoose.model('users', UserSchema);

module.exports = User;