global.express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql');

const app = express();
//接收post过来的数据
app.use(bodyParser.urlencoded({extended: true}));//接收form-data
app.use(bodyParser.json());  //接收json格式的数据

// 数据库连接
global.mydb = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'h51810',
    port:3306
});
mydb.connect();

// 模板引擎
app.engine('html', ejs.renderFile);     //自定义模板引擎
app.set('views', 'tpl');                //设置模板文件所在的文件夹
app.set('view engine', 'html');         //注册模板引擎到express

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

//班级管理的子路由
app.use('/class', require('./router/class'));
//学生管理的子路由
app.use('/stu', require('./router/student'));

// 子路由：express.Router()
app.use('/teacher', require('./router/teacher'));

// 静态资源托管
app.use(express.static(__dirname + '/static'));
app.listen(81, () => {
    console.log('Example app listening on port 81!');
});

