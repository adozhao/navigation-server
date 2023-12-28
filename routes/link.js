const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const LinkModel = mongoose.model('Link')
const logger = require('../log').logger;

// 查询链接列表
router.get('/list', function(req, res, next) {
  const { userId } = req.auth

  LinkModel.aggregate([
    {$match:{userId: {$eq: userId}}},
    {$group:{_id: '$categoryId', list: {$push: '$$ROOT'}}},
    {$lookup: {from: 'categories', localField: '_id', foreignField: 'categoryId', as: 'category'}},
    {$unwind: { path: '$category', preserveNullAndEmptyArrays: true}},
    {$sort: {'category.sort': 1}}
    
  ], (err, result)=>{
    res.json({
      code: 1,
      data: result,
      message: 'success'
    });
  });
});

// 删除链接
router.get('/delete', function(req, res, next) {
  const { userId } = req.auth
  let categoryId = req.query.categoryId

  LinkModel.deleteOne({userId, categoryId}, (err, doc)=>{
    if(doc.ok){
      res.json({
        code: 1,
        data: null,
        message: 'success'
      });
    }
  })
});

// 新增链接
router.post('/add', function(req, res, next) {
  const { userId } = req.auth
  let name = req.body.name
  let link = req.body.link
  let categoryId = req.body.categoryId

  let linkModel = new LinkModel({
    userId,
    name,
    link,
    categoryId
  })
  linkModel.save((err, doc)=>{
    res.json({
      code: 1,
      data: null,
      message: 'success'
    });
  })
});



module.exports = router;
