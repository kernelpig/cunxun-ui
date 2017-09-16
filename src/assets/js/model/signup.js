var UserSignupTemplate = '<div class="am-container am-margin-top">\n' +
    '    <form method="post" class="am-form" id="first_setup">\n' +
    '        <fieldset>\n' +
    '            <legend>用户注册</legend>\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '                    <span class="am-input-group-label"><i class="am-icon-user am-icon-fw"></i></span>\n' +
    '                    <input type="number" id="phone" value="" required placeholder="手机号码">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '                    <input type="number" id="captcha_value" value="" class="" placeholder="图形验证码">\n' +
    '                    <span class="am-input-group-label"><a href="#"><img src="#" id="CaptchaGetImageHandler"\n' +
    '                                                                        class="am-img-loaded"></a></span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '                    <input type="number" id="checkcode_value" value="" class="" placeholder="短信验证码">\n' +
    '                    <span class="am-input-group-label"><a href="#" id="CheckcodeSendHandler">发送-验证码</a></span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="am-form-group">\n' +
    '                <input type="button" id="CheckcodeCheckHandler" value="下一步" class="am-btn am-btn-primary am-btn-sm">\n' +
    '            </div>\n' +
    '        </fieldset>\n' +
    '    </form>\n' +
    '\n' +
    '    <div class="am-hide" id="second_setup">\n' +
    '        <fieldset>\n' +
    '            <legend>用户注册</legend>\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '                    <span class="am-input-group-label"><i class="am-icon-user am-icon-fw"></i></span>\n' +
    '                    <input type="text" id="nickname" value="" required placeholder="昵称">\n' +
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
    '            <div class="am-form-group" id="alert_content">\n' +
    '                <input type="button" id="signup_commit" value="注册" class="am-btn am-btn-primary am-btn-sm">\n' +
    '            </div>\n' +
    '        </fieldset>\n' +
    '    </div>\n' +
    '</div>';

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
    APIUserSignup(signupReq, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            AlertShowNoAutoClose('注册成功', '5秒后跳转到登录页面<a href="login.html">立即跳转</a>>');
            setTimeout(function () {
                $('#alert').modal('close');
                GoToPage("/login.html");
            }, 5000);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function UserSignupRender() {
    $(".ContentContainer").append(UserSignupTemplate);

    CaptchaGetImageHandler();
    $('#CaptchaGetImageHandler').click(CaptchaGetImageHandler);
    $('#CheckcodeSendHandler').click(CheckcodeSendHandler);
    $('#CheckcodeCheckHandler').click(CheckcodeCheckHandler);
}