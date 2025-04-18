const mongoose = require('mongoose');

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: Date.now
    },
});

module.exports = mongoose.model('user',userSchema);