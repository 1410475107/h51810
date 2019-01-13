window.onload = function(){
    adminLogin(); //管理登录
    coderReload();
}


function coderReload(){
    let cimg = document.querySelector('#coder');
    cimg && (
        cimg.onclick = function () {
            this.src = '/coder?_' + new Date();
        }
    );
}

// 管理员登录
function adminLogin(){
    let button = document.querySelector('.adminlogin');
    button.onclick = function(){
        console.log(1);
        let errNum = 0;
        // 获取输入的信息  并检查
        let username = document.querySelector('input[name="username"]'); //属性选择器
        let u_value  = username.value;
        if(u_value ==  ''){
            username.parentElement.nextElementSibling.innerHTML = '*必填';
            username.focus();
            errNum++;
        }else{
            username.parentElement.nextElementSibling.innerHTML = '';
        }

        let passwd = document.querySelector('input[name="passwd"]'); //属性选择器
        let p_value  = passwd.value;
        if(p_value ==  ''){
            passwd.parentElement.nextElementSibling.innerHTML = '*必填';
            passwd.focus();
            errNum++;
        }else{
            passwd.parentElement.nextElementSibling.innerHTML = '';
        }

        let coder = document.querySelector('input[name="coder"]'); //属性选择器
        let c_value  = coder.value;
        if(c_value ==  ''){
            coder.parentElement.nextElementSibling.innerHTML = '*必填';
            coder.focus();
            errNum++;
        }else{
            coder.parentElement.nextElementSibling.innerHTML = '';
        }


        // 把数据提交到服务器  前提：数据填写完整
        if(!errNum){
            // 发起ajax请求
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/login');
            //设置请求头
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            //发送数据到服务器  ES6里面的字符串模板
            xhr.send(`username=${u_value}&passwd=${p_value}&coder=${c_value}`);

            // 状态事件监听并接收响应数据
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status==200){
                    let result = xhr.responseText;
                    // 接收的是字符串类型，需要转成对象
                    result = JSON.parse(result); 
                    console.log(result);
                    if(result.r == 'username_not_exist'){
                        username.parentElement.nextElementSibling.innerHTML = '*账号不存在';
                        username.focus();
                    }else if(result.r == 'passwd_err'){
                        passwd.parentElement.nextElementSibling.innerHTML = '*密码错误';
                        passwd.focus();
                    }else if(result.r == 'coder_err'){
                        coder.parentElement.nextElementSibling.innerHTML = '*验证码错误';
                        coder.focus();
                    }else if(result.r == 'ok'){
                        window.location.href = '/center';
                    }else{
                        
                        alert('未知错误，刷新后操作');
                    }
                }
            }
        }


    }
}