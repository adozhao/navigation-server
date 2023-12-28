const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    link: { type: String, required: true },
    categoryId:{ type: String, required: true }
})

mongoose.model('Link', schema);