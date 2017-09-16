
var UserLoginTemplate = '<div class="am-container am-margin-top">\n' +
    '    <form method="post" class="am-form">\n' +
    '        <fieldset>\n' +
    '            <legend>用户登录</legend>\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '                    <span class="am-input-group-label"><i class="am-icon-user am-icon-fw"></i></span>\n' +
    '                    <input type="number" id="phone" value="" required placeholder="手机号码">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '                    <span class="am-input-group-label"><i class="am-icon-lock am-icon-fw"></i></span>\n' +
    '                    <input type="password" id="password" value="" placeholder="密码">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '                    <input type="number" id="captcha_value" value="" class="" placeholder="验证码">\n' +
    '                    <span class="am-input-group-label"><a href="#"><img src="#" id="CaptchaGetImageHandler"\n' +
    '                                                                        class="am-img-loaded"></a></span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="am-form-group">\n' +
    '                <input type="button" id="UserLoginHandler" value="登 录" class="am-btn am-btn-primary am-btn-sm">\n' +
    '                <input type="button" id="reset_password" value="忘记密码" class="am-btn am-btn-default am-btn-sm">\n' +
    '            </div>\n' +
    '        </fieldset>\n' +
    '    </form>\n' +
    '</div>';

// 用户登录处理函数
function UserLoginHandler() {
    var req = {
        phone: "86 " + $('#phone').val(),
        password: $('#password').val(),
        captcha_value: $('#captcha_value').val(),
        captcha_id: Cookies.get('captcha_id'),
        source: 'web'
    };
    APIUserLogin(req, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            Cookies.set('Authorization', data['user_token']);
            AlertShowAutoClose("登录成功", "马上返回到之前页面!");
            GoToFromPage();
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function UserLoginRender() {
    $(".ContentContainer").append(UserLoginTemplate);

    CaptchaGetImageHandler();
    $('#CaptchaGetImageHandler').click(CaptchaGetImageHandler);
    $('#UserLoginHandler').click(UserLoginHandler);
}