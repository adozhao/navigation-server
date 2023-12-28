const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    userId: { type: String, required: true },
    sort: { type: Number, required: true },
    name: { type: String, required: true },
    categoryId: { type: String, required: true }
})

mongoose.model('Category', schema);