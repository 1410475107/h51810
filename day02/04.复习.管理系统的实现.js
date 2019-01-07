// 1，引入express
const express = require('express');
// 接收post过来的数据
const bodyParser = require('body-parser');
// 数据库操作模块
const mysql = require('mysql');
// 模板引擎
const ejs = require('ejs');
// 2，创建一个web应用
const app = express();

//接收post过来的数据
app.use(bodyParser.urlencoded({
    extended: true
}));
// 连接到数据库
const mydb = mysql.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'h51810',
    port: 3306
});
mydb.connect();

//模板引擎设置
app.engine('html', ejs.renderFile);  //自定义模板引擎html
app.set('views', 'myviews'); //模板文件所在的路径
app.set('view engine', 'html');

//各种路由
app.get('/', (req, res) => {
    res.send('首页');
});
//post路由
app.post('/login', (req, res) => {
    let m = req.body;
    let sql = 'SELECT * FROM admin WHERE username = ?';
    mydb.query(sql, [m.username], (err, result) => {
        //检查账号是否存在
        if (!result.length) {
            res.json({
                r: 'username_not_exist'
            });
            return;
        }
        //检查密码是否正确
        if (result[0].passwd != m.passwd) {
            res.json({
                r: 'passwd_err'
            });
            return;
        }
        //登录成功
        res.json({r:'ok'});

    });

});

// 个人中心
app.get('/center', (req, res) => {
    res.render('center');
});

app.get('/addclass', (req, res) => {
    res.render('addclass');
});

app.get('/class', (req, res) => {
    res.render('class');
});


// 4,静态资源托管
app.use(express.static(__dirname + '/static'));
// 3,端口监听
app.listen(81, () => {
    console.log(`Server started on port 81`);
});