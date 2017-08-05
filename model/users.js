'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema ({
    user: String,
    age: Number,
    gender: {
        type: String,
        enum: ["M", "F"]
    },
    pushups: Number,
    situps: Number,
    score: Number,
    status: {
        type: String,
        enum: ["Pass", "Fail"]
    }
});

module.exports = mongoose.model('User',userSchema);