const router = express.Router();

// 班级添加的相关路由
router.get('/add', (req, res) => {
    res.render('addstu', {username:req.session.username});
});


router.post('/add', (req, res) => {
    let d = req.body;
    let sql = 'INSERT INTO stu(stuname, myhead, descp) VALUES (?,?,?)';
    mydb.query(sql, [d.stuname, d.myhead, d.descp], (err, result)=>{
        console.log(err);
        res.json({r:'ok'});
    });
});



module.exports = router;