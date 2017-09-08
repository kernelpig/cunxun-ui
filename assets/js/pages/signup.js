/**
 * Created by blueair on 17-9-7.
 */

// 1.刷新图形验证码
function RefreshCaptchaImage() {
    var posting = $.post(captchaBaseURI + "/");
    posting.done(function (data) {
        var captchaImageURI = captchaBaseURI + "/" + data['captcha_id'] + "?width=90&height=30";
        $('#captcha_image').attr('src', captchaImageURI);
        Cookies.set('captcha_id', data['captcha_id']);
    });
}

// 2.发送短信验证码
function SendCheckcode() {
    var req = {
        phone: "86 " + $('#phone').val(),
        purpose: "signup",
        source: "web",
        captcha_id: Cookies.get('captcha_id'),
        captcha_value: $('#captcha_value').val()
    };
    var posting = $.ajax({
        url: checkcodeBaseURI + "/send",
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        error: function (e) {
            ShowAlertError(e.responseJSON.sub_error);
        },
        success: function (data) {
            if (data['code'] === 0) {
                ShowAlertAutoClose("发送成功", '发送短信成功, 请注意查收!');
            } else {
                ShowAlertError(data['sub_error']);
            }
        }
    });
}

// 3.校验短信验证码
function CheckCheckcode() {
    var req = {
        phone: "86 " + $('#phone').val(),
        purpose: "signup",
        source: "web",
        verify_code: $('#checkcode_value').val()
    };
    var posting = $.ajax({
        url: checkcodeBaseURI + "/check",
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        error: function (e) {
            ShowAlertError(e.responseJSON.sub_error);
        },
        success: function (data) {
            if (data['code'] === 0) {
                Cookies.set('checkcode_check_req', req);
                $('#first_setup').html($('#second_setup').html());
                $('#signup').click(SignupHandler);
            } else {
                ShowAlertError(data['sub_error']);
            }
        }
    });
}

// 4.登录处理函数
function SignupHandler() {
    var checkReq = JSON.parse(Cookies.get('checkcode_check_req'));
    var signupReq = {
        phone: checkReq.phone,
        source: checkReq.source,
        nickname: $('#nickname').val(),
        password: $('#password').val(),
        verify_code: checkReq.verify_code
    };
    var posting = $.ajax({
        url: userBaseURI + "/signup",
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(signupReq),
        error: function (e) {
            ShowAlertError(e.responseJSON.sub_error);
        },
        success: function (data) {
            if (data['code'] === 0) {
                ShowAlertNotClose('注册成功', '5秒后跳转到登录页面<a href="login.html">立即跳转</a>>');
                setTimeout(function () {
                    $('#alert').modal('close');
                    GoToPage("/login.html");
                }, 5000);
            } else {
                ShowAlertError(data['sub_error']);
            }
        }
    });
}

// 初始化处理
$(document).ready(function () {
    RefreshCaptchaImage();
    $('#captcha_image').click(RefreshCaptchaImage);
    $('#checkcode_send').click(SendCheckcode);
    $('#checkcode_check').click(CheckCheckcode);
});