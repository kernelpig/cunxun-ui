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
            var $checkcode = $("#CheckcodeSendHandler");
            $checkcode.addClass("am-disabled");
            // 一天的时间用于短信倒计时
            var counter = 60 * 60 * 24  - 1;
            var text = $checkcode.text();
            var timer = setInterval(function () {
                if (--counter % 60 === 0) {
                    $checkcode.text(text);
                    $checkcode.removeClass("am-disabled");
                    clearInterval(timer);
                } else {
                    var leftSeconds = counter % 60;
                    if (leftSeconds <= 9 && leftSeconds >= 0) {
                        leftSeconds = "0" + leftSeconds;
                    }
                    var newText = "重 发(" + leftSeconds + "s)";
                    $("#CheckcodeSendHandler").text(newText)
                }
            }, 1000)
        } else {
            AlertShowError(data['sub_error']);
            CaptchaGetImageHandler();
        }
    });
    return false;
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
            $('#UserSignupHandler').click(UserSignupHandler);
            $('#AvatarSelectHandler').click(AvatarSelectHandler);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
    return false;
}