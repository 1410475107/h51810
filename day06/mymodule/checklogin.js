module.exports = function(req, res, next){
    if(!req.session.aid){
        //服务器端跳转
        res.redirect('/login.html');
    }else{
        next();
    }
}