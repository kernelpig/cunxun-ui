// 刷新图形验证码
function CaptchaGetImageHandler() {
    APICaptchaGetID(AlertShowAjaxError, function (data) {
        var captchaImageURI = captchaBaseURI + "/" + data['captcha_id'] + "?width=90&height=30";
        $('#CaptchaGetImageHandler').attr('src', captchaImageURI);
        Cookies.set('captcha_id', data['captcha_id']);
    });
}