/**
 * Created by blueair on 17-9-7.
 */

// 显示错误信息
function ShowAlert(msg) {
    $('#alert').text(msg);
    $('#alert').css('color', 'red');
}

// 刷新图形验证码
function RefreshCaptchaImage() {
    var posting = $.post(captchaBaseURI + "/");
    posting.done(function (data) {
        var captchaImageURI = captchaBaseURI + "/" + data['captcha_id'] + "?width=90&height=30";
        $('#captcha_image').attr('src', captchaImageURI);
        Cookies.set('captcha_id', data['captcha_id']);
    });
}

// 登录处理函数
function LoginHandler() {
    var req = {
        phone: "86 " + $('#phone').val(),
        password: $('#password').val(),
        captcha_value: $('#captcha_value').val(),
        captcha_id: Cookies.get('captcha_id'),
        source: 'web'
    };
    var posting = $.ajax({
        url: userBaseURI + "/login",
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        error: function (e) {
            ShowAlert(e.responseJSON.sub_error);
        },
        success: function (data) {
            if (data['code'] === 0) {
                Cookies.set('X-Token', data['user_token']);
            } else {
                ShowAlert(data['sub_error']);
            }
        }
    });
}

// 初始化处理
$(document).ready(function () {
    RefreshCaptchaImage();
    $('#captcha_image').click(RefreshCaptchaImage);
    $('#login').click(LoginHandler);
});