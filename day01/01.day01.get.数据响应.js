const express = require('express');
const app = express();

//使用send响应内容
app.get('/', (req, res) => {
    res.send('今天天气不错');
    // 不需要end
});

app.get('/a', (req, res) => {
    res.send(['马雪', '谢波', '艾杰明']);
});

app.get('/o', (req, res) => {
    res.send({
        name: '吴明程',
        age: 18
    });
});
app.get('/json', (req, res) => {
    res.send([{
        name: '范力川',
        gender: '男',
        age: 19
    }, {
        name: '王兰',
        gender: '女'
    }, {
        name: '王艳秋',
        gender: '女'
    }]);
});


//直接响应json格式的数据
app.get('/j', (req, res) => {
     res.json([{name:'吴利春', age:18},{name:'周玉森', age:18}]);
});


app.listen(81, () => {
    console.log(`Server started on port 81`);
});