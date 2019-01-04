// 引入第三方模块
const express = require('express');
//创建一个应用
const app = express();
//实现get请求
app.get('/', (req, res) => {
    res.write('index shou ye');
    res.end();
});
app.get('/h1810', (req, res) => {
    res.write('H51810');
    res.end();
});
app.get('/my', function(request, response){
    response.setHeader('content-type', 'text/html;charset="utf-8"');
    response.write('内容响应');
    response.end();
});

app.listen(88, () => {
    console.log(`Server started on port 88`);
});