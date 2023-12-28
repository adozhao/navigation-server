const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const LinkModel = mongoose.model('Link')
const CategoryModel = mongoose.model('Category')

const uuid = require('node-uuid')

const logger = require('../log').logger;



// 更新分类名称
router.post('/updateName', function(req, res, next) {
  const { userId } = req.auth
  const categoryId = req.body.categoryId
  const name = req.body.name

  CategoryModel.updateOne({userId, categoryId}, {name}, (err, doc)=>{
    if(doc.ok){
      res.json({
        code: 1,
        data: null,
        message: 'success'
      });
    }
  })
  
});

// 分类排序
router.post('/sort', function(req, res, next) {
  const { userId } = req.auth
  const ids = req.body

  let count = 0
  ids.forEach(async (categoryId, sort)=>{
    try {
      await CategoryModel.updateOne({userId, categoryId}, {sort}, (err, doc)=>{})
      count++
      if(count == ids.length){
        res.json({
          code: 1,
          data: null,
          message: 'success'
        });
      }
    } catch (err) {
      res.json({
        code: 1,
        data: null,
        message: '排序失败'
      });
    }
   
  })
  
});

// 删除分类
router.get('/delete', function(req, res, next) {
  const { userId } = req.auth
  const categoryId = req.query.categoryId

  CategoryModel.deleteOne({userId, categoryId}, (err, doc)=>{
    if(doc.ok){
      LinkModel.deleteMany({userId, categoryId}, ()=>{
        res.json({
          code: 1,
          data: null,
          message: 'success'
        });
      })
    }
  })
});


// 查询分类
router.get('/list', function(req, res, next) {
  const { userId } = req.auth

  CategoryModel.aggregate([
    {$match:{userId: {$eq: userId}}},
    {$lookup: {from: 'links', localField: 'categoryId', foreignField: 'categoryId', as: 'links'}},
    {$sort: {sort: 1}}
  ], (err, doc)=>{
    res.json({
      code: 1,
      data: doc,
      message: 'success'
    });
  });
});

// 新增分类
router.get('/add', function(req, res, next) {
  const { userId } = req.auth
  let sort = 0
  CategoryModel.find({userId},(err, doc)=>{
    sort += doc.length
    let categoryId = uuid.v1()
    let categoryModel = new CategoryModel({
      userId,
      sort,
      name: '新分类',
      categoryId
    })
    categoryModel.save((err, doc)=>{
      res.json({
        code: 1,
        data: null,
        message: 'success'
      });
    })
  })
});

module.exports = router;
