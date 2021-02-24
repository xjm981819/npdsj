$(function () {
    const { form, layer } = layui;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称不能大于6位'
            }
        }
    })


    initUserInfo()
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('userInfo', res.data)
            }
        })
    }
    // 重置表单的数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })
    $('layui-fom').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            // 快速获取表单数据
            data: $(this).serialize(),
            success(res) {
                // 判断响应结果
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 调用父页面渲染头像和用户名的方法
                window.parent.getUserInfo();
            }
        })
    })
})


