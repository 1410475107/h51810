const express = require('express');
const app = express();  //华清远见  成都中心
app.get('/', (req, res) => {
    res.send('首页');
});


// 创建子路由
// app.use('/admin/news', require('./router/news/index.js'));
app.use('/admin/news', require('./router/news'));
app.use('/admin/user', require('./router/user/a'));
app.use('/admin', require('./router/admin.js'));





// 静态资源托管
app.use(express.static(__dirname + '/static'));
app.listen(81, () => {
    console.log('Example app listening on port 81!');
});


