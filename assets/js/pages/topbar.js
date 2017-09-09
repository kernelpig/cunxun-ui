
// 初始化登录状态
function SetSignStatus() {
    if (!Cookies.get('Authorization')) {
        $('#login_signup_container').show();
        $('#user_center_container').hide();
        $('#signup').click(GoToSignupPage);
        $('#login').click(GoToLoginPage);
    } else {
        $('#login_signup_container').hide();
        $('#user_center_container').show();
        $('#logout').click(UserLogout);
    }
}

// 用户登出
function UserLogout() {
    Cookies.remove('Authorization');
    ShowAlertAutoClose('登出成功', '登出成功');
    SetSignStatus();
}

// 初始化处理
$(document).ready(function () {
    SetSignStatus();
});
