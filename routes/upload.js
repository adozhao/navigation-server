const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const md5 = require('md5');
const multer  = require('multer');
const logger = require('../log').logger;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, md5(file.originalname))
    }
})
   
const upload = multer({ storage, limits: { fileSize: 1024 * 1000 } })

router.post('/upload', upload.single('file'), function(req, res, next) {
    const { userId } = req.auth
    const { filename } = req.file
    
    const path = `/uploads/${filename}`
    
    UserModel.updateOne({userId}, {bgPath: path}, (err, doc)=>{
        res.json({
            code: 1,
            data: path,
            message: 'success'
        });
    })
});

module.exports = router;