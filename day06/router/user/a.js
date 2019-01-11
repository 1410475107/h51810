const express = require('express');
const miniApp = express.Router();


miniApp.get('/', (req, res)=>{
    res.send('用户管理页面');
});


module.exports = miniApp;