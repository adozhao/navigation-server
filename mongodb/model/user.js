const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bgPath: {  type: String, required: false }
})

mongoose.model('User', schema);