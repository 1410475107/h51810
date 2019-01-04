let body = function(req, res, next){
    // 接收post过来的数据
    let mydata = '';
    req.on('data', (data)=>{
        mydata += data;
    });
    req.on('end', ()=>{
        // 就可以使用接收过来的数据  到数据库进行数据操作等等   '3'
        //   username=1&passwd=2  --->  {username:1, passwd:2}
        let body = {};
        let d = mydata.split('&');  //['username=1', 'passwd=2']
        for (let ind = 0; ind < d.length; ind++) {
            const e = d[ind].split('=');  //['username', 1]
            body[e[0]] = e[1]; //{username:1}
        }
       //  res.send(body);  继续往下执行
       req.body = body;
       // res.send('1');
       next();
    });
}

module.exports = body;