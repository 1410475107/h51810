window.onload = function () {
    let layer = layui.layer;
    addClass();
    updateClass();
    delClass();
}


function updateClass() {
    let btn = document.querySelector('.updateclass');
    // if(!btn) return;
    btn && (btn.onclick = function () {
        //获取要修改的信息的cid
        let cid = document.querySelector('input[name="cid"]').value;
        // 获取输入框的值
        let cname = document.querySelector('input[name="cname"]');
        let c_value = cname.value;
        //检查信息是否输入
        if (!c_value) {
            layer.msg('班级名称必填');
            cname.focus();
            return false;
        }
        // 通过ajax的方式把数据发送到服务器
        axios.post('/updateclass', {
                cname: c_value,
                cid:cid
            })
            .then(function (response) {
                console.log(response);
                if (response.data == 'ok') {
                    window.location.href = '/class';
                }
            })
            .catch(function (error) {})
    });
}

function addClass() {
    let btn = document.querySelector('.addclass');
    // if(!btn) return;
    btn && (btn.onclick = function () {
        let cname = document.querySelector('input[name="cname"]');
        let c_value = cname.value;
        //检查信息是否输入
        if (!c_value) {
            layer.msg('班级名称必填');
            cname.focus();
            return false;
        }
        // 通过ajax的方式把数据发送到服务器
        axios.post('/addclass', {
                cname: c_value
            })
            .then(function (response) {
                console.log(response);
                if (response.data == 'ok') {
                    window.location.href = '/class';
                }
            })
            .catch(function (error) {})
    });
}

function delClass() {
    //使用事件代理实现点击事件  confirm
    let clist = document.querySelector('.classlist');
    clist && (clist.onclick = function (e) {
        let target = e.target;
        //点击的节点包含delc这个类表示删除  data-cid
        if (target.classList.contains('delc')) {
            layer.open({
                content: '是否确定删除？',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    let cid = target.dataset.cid;
                    //到数据库删除对应的信息
                    axios.get('/delc', {
                        params: {
                            cid: cid
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        layer.close(index); // 关闭弹窗
                        // 隐藏或者删除当前行
                        if(response.data.r == 'success'){
                            //window.location.reload();//自动刷新 
                            target.parentNode.parentNode.remove();
                        }
                    })
                    .catch(function (error) {})
                },
                btn2: function (index, layero) {
                },
                cancel: function () {
                }
            });
        }
    })
}