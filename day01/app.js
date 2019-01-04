const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
// app.get('/img/15b.jpg', (req, res) => {
//     res.send('1');
// });
//静态资源托管
// app.use('/a123',express.static(__dirname + '/html'));
// app.use('/css',express.static(__dirname + '/css'));
// app.use('/js',express.static(__dirname + '/js'));

// 使用use调用中间件
app.use(function(req, res, next){
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
});

// 接收post过来的数据
app.post('/mydata', (req, res) => {
    console.log(req.body);
    res.send('POST');
});


app.post('/login', (req, res) => {
    res.send(req.body);
});
// 静态资源托管
app.use(express.static(__dirname + '/static'));

app.listen(81, () => {
    console.log('Example app listening on port port!');
});

//Run app, then load http://localhost:port in a browser to see the output.