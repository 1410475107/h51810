const express = require('express');
const miniApp = express.Router();


miniApp.get('/', (req, res)=>{
    res.send('新闻管理页面');
});

miniApp.get('/add', (req, res)=>{
    res.send('新闻添加');
});

miniApp.get('/del', (req, res)=>{
    res.send('新闻删除');
});


miniApp.get('/update', (req, res)=>{
    res.send('新闻更新');
});


module.exports = miniApp;