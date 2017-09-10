
// 发送短信验证码
function CheckcodeSendHandler() {
    var req = {
        phone: "86 " + $('#phone').val(),
        purpose: "signup",
        source: "web",
        captcha_id: Cookies.get('captcha_id'),
        captcha_value: $('#captcha_value').val()
    };
    APICheckcodeSend(req, ShowAlertAjax, function (data) {
        if (data['code'] === 0) {
            ShowAlertAutoClose("发送成功", '发送短信成功, 请注意查收!');
        } else {
            ShowAlertError(data['sub_error']);
        }
    });
}

// 校验短信验证码
function CheckcodeCheckHandler() {
    var req = {
        phone: "86 " + $('#phone').val(),
        purpose: "signup",
        source: "web",
        verify_code: $('#checkcode_value').val()
    };
    APICheckcodeCheck(req, ShowAlertAjax, function (data) {
        if (data['code'] === 0) {
            Cookies.set('CheckcodeCheckReqContext', req);
            $('#first_setup').html($('#second_setup').html());
            $('#signup_commit').click(SignupHandler);
        } else {
            ShowAlertError(data['sub_error']);
        }
    });
}

// 登录处理函数
function SignupHandler() {
    var checkReq = JSON.parse(Cookies.get('CheckcodeCheckReqContext'));
    var signupReq = {
        phone: checkReq.phone,
        source: checkReq.source,
        nickname: $('#nickname').val(),
        password: $('#password').val(),
        verify_code: checkReq.verify_code
    };
    APIUserSignup(signupReq, ShowAlertAjax, function (data) {
        if (data['code'] === 0) {
            ShowAlertNotClose('注册成功', '5秒后跳转到登录页面<a href="login.html">立即跳转</a>>');
            setTimeout(function () {
                $('#alert').modal('close');
                GoToPage("/login.html");
            }, 5000);
        } else {
            ShowAlertError(data['sub_error']);
        }
    });
}

// 初始化处理
$(document).ready(function () {
    CaptchaGetImageHandler();
    $('#CaptchaGetImageHandler').click(CaptchaGetImageHandler);
    $('#CheckcodeSendHandler').click(CheckcodeSendHandler);
    $('#CheckcodeCheckHandler').click(CheckcodeCheckHandler);
});