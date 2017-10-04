var UserSignupTemplate = '<div class="am-container am-margin-top">\n' +
    '    <form method="post" class="am-form" id="first_setup">\n' +
    '        <fieldset>\n' +
    '            <legend>用户注册</legend>\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '                    <span class="am-input-group-label"><i class="am-icon-phone am-icon-fw"></i></span>\n' +
    '                    <input type="number" id="phone" class="js-pattern-mobile" minlength="11" maxlength="11" required placeholder="手机号码" data-validation-message="输入大陆手机号码, 必须为11位">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '                    <input type="number" id="captcha_value" value="" class="" required minlength="3" maxlength="3" placeholder="图形验证码" data-validation-message="输入图形验证码, 必须为3位">\n' +
    '                    <span class="am-input-group-btn"><button href="#" class="am-btn am-btn-xs"><img src="#" id="CaptchaGetImageHandler"\n' +
    '                                                                        class="am-img-loaded"></button></span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '                    <input type="number" id="checkcode_value" required minlength="4" maxlength="4" placeholder="短信验证码" data-validation-message="输入短信验证码, 必须为4位">\n' +
    '                    <span class="am-input-group-btn"><button href="#" id="CheckcodeSendHandler" class="am-btn am-btn-xs">发送验证码</button></span>\n' +
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
    '                    <input type="text" id="nickname" required placeholder="昵称" minlength="1" maxlength="32" data-validation-message="输入昵称, 必须为1~32位">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '                    <span class="am-input-group-label"><i class="am-icon-lock am-icon-fw"></i></span>\n' +
    '                    <input type="password" id="password" required minlength="8" maxlength="16" placeholder="密码" data-validation-message="输入密码, 必须为8~16位">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="am-form-group" id="alert_content">\n' +
    '                <input type="button" id="UserSignupHandler" value="注册" class="am-btn am-btn-primary am-btn-sm">\n' +
    '                <input type="button" id="AvatarSelectHandler" value="头像" class="am-btn am-btn-default am-btn-sm">\n' +
    '            </div>\n' +
    '        </fieldset>\n' +
    '    </div>\n' +
    '</div>';

function UserSignupHandler() {
    var checkReq = JSON.parse(Cookies.get('CheckcodeCheckReqContext'));
    var signupReq = {
        phone: checkReq.phone,
        source: checkReq.source,
        nickname: $('#nickname').val(),
        password: $('#password').val(),
        verify_code: checkReq.verify_code,
        avatar: AvatarImageBytes
    };
    APIUserSignup(signupReq, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            AlertShowNoAutoClose('注册成功', '5秒后跳转到登录页面<a href="login.html">立即跳转</a>>');
            setTimeout(function () {
                $('#alert').modal('close');
                AvatarImageBytes = null;
                GoToPage("/login.html");
            }, 5000);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

// 显示头像上传对话框
function AvatarSelectHandler() {
    $("#AvatarUploadBox").modal({width:'600px'});
}

function UserSignupRender() {
    $(".ContentContainer").append(UserSignupTemplate);

    CaptchaGetImageHandler();
    $('#CaptchaGetImageHandler').click(CaptchaGetImageHandler);
    $('#CheckcodeSendHandler').click(CheckcodeSendHandler);
    $('#CheckcodeCheckHandler').click(CheckcodeCheckHandler);
    $(".am-form").validator(formValidator);
}