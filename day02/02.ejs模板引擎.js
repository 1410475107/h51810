const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
const ejs = require('ejs');

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
    port: 3306
});
mydb.connect();


app.post('/login', (req, res) => {
    let data = req.body;
    let sql = 'SELECT * FROM admin WHERE username = ?';
    // 只有一个占位符的时候，可以不用数组
    mydb.query(sql, [data.username], (err, result) => {
        if (err) {
            console.log(err);
            res.send('err');
            return;
        }
        console.log(result);
        console.log(result == []);
        // 判断账号是否存在
        if (!result.length) {
            res.json({
                r: 'username_not_exist'
            });
            return;
        }
        // 判断密码是否正确
        if (result[0].passwd != data.passwd) {
            res.json({
                r: 'passwd_err'
            });
            return;
        }
        res.json({
            r: 'ok'
        });
    });
});

//个人中心展示   用于理解模板引擎的基本原理
app.get('/center', (req, res) => {
    let username = '艾杰明';
    let info123 = '编程爱好者';
    username = '周玉森';
    fs.readFile('./view/my.html', (err, data) => {
        //##username##  --> 艾杰明
        res.send(data.toString()
            .replace('##username##', username)
            .replace('##info##', info123)
        );
    });
});

// ejs模板引擎
app.get('/ejs', (req, res) => {
    ejs.renderFile(
        __dirname + '/view/my_ejs.html', {
            username: '艾杰明',
            age: 20,
            info: '爱好<b>编程</b>',
            orders:[
                '我的订单1',
                '我的订单2',
                '我的订单3'
            ]
        },
        (err, str) => {
            res.send(str);
        });
});

app.use(express.static(__dirname + '/static'));

app.listen(81, () => {
    console.log(`Server started on port 81`);
});