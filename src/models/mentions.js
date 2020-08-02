const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    friend:{
        type: String,
        required: true,
        trim: true
    },
    mention:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Mentions', Schema);