global.express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const svgCaptcha = require('svg-captcha');
const app = express();
//开启cookie
let secret = 'moc.01815h.www';
app.use(cookieParser(secret));
// 开启session
app.use(session({
    secret: secret,
    name:'sessid1810',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:24*3600000}
  }))

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
    //验证验证码是否正确
    let coder = m.coder;
    if(coder.toLowerCase() != req.session.coder.toLowerCase()){
        res.json({
            r: 'coder_err'
        });
        return;
    }
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
        //设置session，表示登录授权
        req.session.aid = result[0].aid;
        req.session.username = result[0].username;

        
        //登录成功
        res.json({r:'ok'});

    });

});


//验证码生成路由
app.get('/coder', (req, res) => {
    //输出一张图片：验证码图片
    let captcha = svgCaptcha.create({
        background:'#ffdd33',
        color: true
    });
    console.log(captcha.text);
    // 把图片上的文字信息存储在session里面
	req.session.coder = captcha.text;
	
	res.type('svg');
	res.status(200).send(captcha.data);

});
// 个人中心
app.get('/center', (req, res) => {
    res.render('center');
});

//班级管理的子路由
app.use('/class', require('./router/class'));
//学生管理的子路由
app.use('/stu', require('./router/student'));


// 静态资源托管
app.use(express.static(__dirname + '/static'));
app.listen(81, () => {
    console.log('Example app listening on port 81!');
});

