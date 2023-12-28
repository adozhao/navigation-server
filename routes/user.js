const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const UserModel = mongoose.model('User')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
const config = require('../config')
const uuid = require('node-uuid')

const logger = require('../log').logger;


// 根据token获取用户信息
router.get('/getUserByToken', function(req, res, next) {
  let { userId, username } = req.auth
  UserModel.findOne({userId}, (err, doc)=>{
    res.json({ 
      code: 1, 
      data: {
        userId,
        username,
        bgPath: doc.bgPath,
      },
      message: 'success'
    })
  })
});

// 用户注册
router.post('/register', function(req, res, next) {
  const username = req.body.username
  const password = req.body.password

  const userId = uuid.v1()
  
  UserModel.findOne({username}, (err, doc)=>{
    if(doc){
      return res.json({ code: 0, data: null, message: '用户名已存在' });
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        let user = new UserModel({
          userId,
          username,
          password: hash,
          bgPath: ''
        })
        user.save(function (err, doc) {
          res.json({ code: 1, data: null, message: 'success' })
        })
      });
    });
  })
});

// 用户登录
router.post('/login', function(req, res, next) {
  const username = req.body.username
  const password = req.body.password

  UserModel.findOne({username}, (err, doc)=>{
    if(!doc){
      res.json({
        code: 0,
        data: null,
        message: 'success'
      });
    }
    else{
      bcrypt.compare(password, doc.password, async (err, boo)=>{
        if(boo){
          let token =  await jwt.sign({ userId: doc.userId, username}, config.jwt.secret, {
              expiresIn: config.jwt.expires
          });
          res.json({
            code: 1,
            data: {username, bgPath: doc.bgPath, token},
            message: 'success'
          });
        }
        else{
          res.json({
            code: 0,
            data: null,
            message: '用户名或密码错误'
          });
        }
      })
    }
  })
});


// 删除背景
router.get('/unlinkBg', function(req, res, next) {
  const { userId } = req.auth

  UserModel.updateOne({userId}, {bgPath: ''}, (err, doc)=>{
    if(doc.ok){
      res.json({
        code: 1,
        data: null,
        message: '背景删除成功'
      });
    }
  })
});



module.exports = router;
