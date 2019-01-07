const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

//启用中间件  接收post数据
app.use(bodyParser.urlencoded({
    extended: true
})); //form表单数据

// 数据库连接
const mydb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'h51810',
    port:3306
});
mydb.connect();

// 各种路由 GET  POST
app.get('/', (req, res) => {
    res.send('数据响应');
});

//新闻列表路由
app.get('/list', (req, res) => {
    res.send('新闻列表');
});

app.get('/center', (req, res) => {
    res.send('个人中心');
});


// 登录数据验证
app.post('/login', (req, res) => {
    let data = req.body;
    let sql =  'SELECT * FROM admin WHERE username = ?';
    // 只有一个占位符的时候，可以不用数组
    mydb.query(sql, [data.username], (err, result)=>{
        if(err){
            console.log(err);
            res.send('err');
            return ;
        }
        console.log(result);
        console.log(result == []);
        // 判断账号是否存在
        if(!result.length){
            res.json({r:'username_not_exist'});
            return;
        }
        // 判断密码是否正确
        if(result[0].passwd != data.passwd){
            res.json({r:'passwd_err'});
            return;
        }
        res.json({r:'ok'});
    });
});
// 静态资源托管 express.static
app.use(express.static(__dirname + '/static'));


// 端口监听
app.listen(81, () => {
    console.log(`Server started on port 81`);
});