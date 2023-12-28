const mongoose = require('mongoose')
const config = require('./config.js')

module.exports = ()=>{
    const db = mongoose.connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

    require('./model/user.js');
    require('./model/link.js');
    require('./model/category.js');

    return db
}