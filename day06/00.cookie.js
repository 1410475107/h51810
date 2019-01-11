global.express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

//开启cookie
let secret = 'moc.01815h.www';
app.use(cookieParser(secret));

app.get('/setc', (req, res)=>{
    // 设置cookie在响应端设置   res
    // cookie是存储在请求端的   req
    res.cookie('username', '范力川', {maxAge:7*24*3600000});  //设置一个cookie
    res.cookie('age', 20);
    res.cookie('gender', 1);
    res.cookie('tel', '13989898769', {signed:true});
    res.send('设置了cookie');
});


app.get('/getc', (req, res) => {
    console.log(req.cookies);
    // res.send(`你好，${req.cookies.username}${req.cookies.gender == 1 ? '先生':'女士'}`);
    // res.send(req.cookies);
    res.send(req.signedCookies);
});

app.get('/delc', (req, res) => {
    res.clearCookie('age');
    res.send(req.cookies);
});

app.use(express.static(__dirname + '/static'));
app.listen(81, () => {
    console.log('Example app listening on port 81!');
});

