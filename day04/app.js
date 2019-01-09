const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql');

const app = express();
//接收post过来的数据
app.use(bodyParser.urlencoded({extended: true}));//接收form-data
app.use(bodyParser.json());  //接收json格式的数据

// 数据库连接
const mydb = mysql.createConnection({
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

// 班级添加的相关路由
app.get('/addclass', (req, res) => {
    res.render('addclass');
});
app.post('/addclass', (req, res) => {
    console.log(req.body);
    // 保存到数据库
    let sql = 'INSERT INTO  class(cname, addtimes) VALUES (?,NOW())';
    mydb.query(sql, [req.body.cname], (err, result)=>{
        res.send('ok');
    });
    
});
// 展示班级列表
app.get('/class', (req, res) => {
    // 实现分页
    let pagenum = 10;  //每页显示多少条
    let page = req.query.page ? req.query.page : 1;
    
    // 到数据库里面把数据查询出来
    let sql = 'SELECT * FROM class WHERE status = 1';
    // 如果用户输入le 关键词进行搜索  sql语句里面需要加上对应的判断条件  模糊查询
    let kw = req.query.keywords;
    if(kw){
        sql += ' AND cname LIKE "%'+kw+'%"';
    }else{
        kw = '';
    }
    //显示当前页的数据
    sql += ' LIMIT ?,?';
    
    // 循环的开始和结束位置
    let shownum = 5; //总得要显示的页数
    let start  =  page-Math.floor((shownum-1)/2); 
    let end  = page/1 + Math.ceil((shownum-1)/2);
    // 验证start是否小于1
    if(start < 1){
        start = 1;
        // 重新计算end
        end  = Math.ceil((shownum-1)/2) + Math.floor((shownum-1)/2) + start;
    }
    // TODO:验证end

    mydb.query(sql, [(page-1)*pagenum, pagenum],(err, results)=>{
        console.log(results);
        // 需要把传递的数据放到对象里面
        res.render('class',{clist:results, keywords:kw, page:page, start:start, end:end});
    });
});
// 删除班级的路由
app.get('/delc', (req, res) => {
    let cid = req.query.cid;
    // let sql = 'DELETE FROM class WHERE cid = ?';
    let sql = 'UPDATE class SET status = 2 WHERE cid = ?';
    mydb.query(sql, cid, (err, result)=>{
        if(!err){
            res.json({r:'success'});
        }
    });
});

//修改信息   原始信息展示页面
app.get('/updatec', (req ,res)=>{
    let cid = req.query.cid;
    //到数据库里面获取原始信息
    let sql = 'SELECT * FROM class WHERE cid = ?';
    mydb.query(sql, cid, (err, result)=>{
        //[{cid:2, cname:'H51810'}]  result[0] == {cid:2, cname:'H51810'}  
        res.render('updatec', result[0]);
    });
});

app.post('/updateclass', (req, res) => {
    console.log(req.body);
    // 保存到数据库
    let sql = 'UPDATE class SET  cname= ? WHERE cid = ?';
    mydb.query(sql, [req.body.cname, req.body.cid], (err, result)=>{
        res.send('ok');
    });
    
});

// 静态资源托管
app.use(express.static(__dirname + '/static'));
app.listen(81, () => {
    console.log('Example app listening on port 81!');
});

