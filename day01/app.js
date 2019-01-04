const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//启用接收post数据的中间件
app.use(bodyParser.urlencoded({extended: true}));

// 登录验证
app.post('/login', (req, res) => {
    console.log(req.body);
    res.send('pwd_err');
});

//静态资源托管
app.use(express.static(__dirname + '/static'));

app.listen(81, () => {
    console.log('Example app listening on port 81!');
});