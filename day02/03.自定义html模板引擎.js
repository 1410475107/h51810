const express = require('express');
const ejs = require('ejs');

const app = express();

//注册模板引擎ejs到express
app.engine('html', ejs.renderFile); //定义模板引擎，自定后缀是html
app.set('views', 'myviews'); //指定模板文件所在的文件夹
app.set('view engine', 'html'); //注册模板引擎到express

app.get('/my', (req, res) => {
    res.render('my', {username:'范力川'});
});

app.use(express.static(__dirname + '/static'));

app.listen(81, () => {
    console.log(`Server started on port 81`);
});