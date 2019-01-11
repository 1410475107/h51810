let part1 = express.Router();
part1.get('/h5', (req, res)=>{
    res.send('欢迎来玩。');
});

part1.get('/java', (req, res)=>{
    res.send('欢迎来hecha。');
});


module.exports = part1;