const express = require('express');
const app = express();
///引入系统模块
const url = require('url');

app.get('/my', (req, res) => {
    /*
    let md = url.parse(req.url, true);
    res.send('我的年龄：' + md.query.age + md.query.name);
    */
   res.json(req.query);
});

app.listen(81, () => {
    console.log('Example app listening on port 81!');
});

//Run app, then load http://localhost:81 in a browser to see the output.