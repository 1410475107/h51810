const async = require('async');
const router = express.Router();

//如果没有登录，不能进行以下操作
router.use(require('../mymodule/checklogin.js'));

// 班级添加的相关路由
router.get('/add', (req, res) => {
    res.render('addclass', {username:req.session.username});
});
router.post('/add', (req, res) => {
    // 保存到数据库
    let sql = 'INSERT INTO  class(cname, addtimes) VALUES (?,NOW())';
    mydb.query(sql, [req.body.cname], (err, result)=>{
        res.send('ok');
    });
});
// 展示班级列表
router.get('/', (req, res) => {
    // 实现分页
    let pagenum = 10;  //每页显示多少条
    let page = req.query.page ? req.query.page : 1;
    // 如果用户输入le 关键词进行搜索  sql语句里面需要加上对应的判断条件  模糊查询
    let kw = req.query.keywords;

    // 执行顺序控制
    async.series({
        nums: function(cb) {
            let sql = 'SELECT count(*) nums FROM class WHERE status = 1';
            mydb.query(sql, (err, result)=>{
                cb(null, result[0].nums);
            })
        },
        list: function(cb){
            // 到数据库里面把数据查询出来
            let sql = 'SELECT * FROM class WHERE status = 1';
            if(kw){
                sql += ' AND cname LIKE "%'+kw+'%"';
            }else{
                kw = '';
            }
            //显示当前页的数据
            sql += ' LIMIT ?,?';
            mydb.query(sql, [(page-1)*pagenum, pagenum], (err, result)=>{
                cb(null, result);
            });
        }
    }, function(err, results) {
        console.log(results);
         // 循环的开始和结束位置
        let shownum = 5; //总得要显示的页数
        let start  =  page - Math.floor((shownum-1)/2); 
        let end  = page/1 + Math.ceil((shownum-1)/2);
        // 验证start是否小于1
        if(start < 1){
            start = 1;
            // 重新计算end
            end  = Math.ceil((shownum-1)/2) + Math.floor((shownum-1)/2) + start;
        }
        // 不能超出总页数
        let totalpage = Math.ceil(results.nums/pagenum);
        if(end > totalpage){
            end = totalpage;
            // 重新计算start
            start  = end-Math.ceil((shownum-1)/2) - Math.floor((shownum-1)/2);
            if(start < 1) start = 1;
        }
        // TODO:验证end
        res.render('class',{clist:results.list, keywords:kw, page:page, start:start, end:end});
        
    });
});
// 删除班级的路由
router.get('/del', (req, res) => {
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
router.get('/update', (req ,res)=>{
    let cid = req.query.cid;
    //到数据库里面获取原始信息
    let sql = 'SELECT * FROM class WHERE cid = ?';
    mydb.query(sql, cid, (err, result)=>{
        //[{cid:2, cname:'H51810'}]  result[0] == {cid:2, cname:'H51810'}  
        res.render('updatec', result[0]);
    });
});

router.post('/update', (req, res) => {
    console.log(req.body);
    // 保存到数据库
    let sql = 'UPDATE class SET  cname= ? WHERE cid = ?';
    mydb.query(sql, [req.body.cname, req.body.cid], (err, result)=>{
        res.send('ok');
    });
    
});


module.exports = router;