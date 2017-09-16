// 发送短信验证码
function CheckcodeSendHandler() {
    var req = {
        phone: "86 " + $('#phone').val(),
        purpose: "signup",
        source: "web",
        captcha_id: Cookies.get('captcha_id'),
        captcha_value: $('#captcha_value').val()
    };
    APICheckcodeSend(req, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            AlertShowAutoClose("发送成功", '发送短信成功, 请注意查收!');
        } else {
            AlertShowError(data['sub_error']);
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
    APICheckcodeCheck(req, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            Cookies.set('CheckcodeCheckReqContext', req);
            $('#first_setup').html($('#second_setup').html());
            $('#signup_commit').click(SignupHandler);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}