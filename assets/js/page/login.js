
// 用户登录处理函数
function UserLoginHandler() {
    var req = {
        phone: "86 " + $('#phone').val(),
        password: $('#password').val(),
        captcha_value: $('#captcha_value').val(),
        captcha_id: Cookies.get('captcha_id'),
        source: 'web'
    };
    APIUserLogin(req, ShowAlertAjax, function (data) {
        if (data['code'] === 0) {
            Cookies.set('Authorization', data['user_token']);
            ShowAlertAutoClose("登录成功", "马上返回到之前页面!");
            GoToFromPage();
        } else {
            ShowAlertError(data['sub_error']);
        }
    });
}

// 初始化处理
$(document).ready(function () {
    CaptchaGetImageHandler();
    $('#CaptchaGetImageHandler').click(CaptchaGetImageHandler);
    $('#UserLoginHandler').click(UserLoginHandler);
});