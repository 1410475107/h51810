const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 使用use调用中间件
// app.use(require(__dirname+'/my_module/post'));
app.use(bodyParser.urlencoded({extended: true}));

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