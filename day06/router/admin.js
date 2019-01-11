const express = require('express');
// 创建子路由
const miniApp = express.Router();

miniApp.get('/', (req, res)=>{
    res.send('管理员首页');
});

miniApp.get('/a', (req, res)=>{
    res.send('小王');
});




module.exports = miniApp;