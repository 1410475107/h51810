global.express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
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

app.get('/sets', (req, res) => {
    req.session.username = '王艳秋';
    req.session.gender =  2;
    res.send('设置session');
    
});

app.get('/gets', (req, res) => {
    res.send('欢迎你，' + req.session.username + (req.session.gender == 1 ? '帅哥':'美女'));
});

app.get('/dels', (req, res) => {
    delete req.session.username;
    res.send('删除session');
    
});


app.use(express.static(__dirname + '/static'));
app.listen(81, () => {
    console.log('Example app listening on port 81!');
});

