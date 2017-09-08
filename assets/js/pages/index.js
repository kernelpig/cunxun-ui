
// 初始化登录状态
function SetSignStatus() {
    if (!Cookies.get('X-Token')) {
        $('#topbar-container').html($('#login_signup_container').html());
        $('#signup').click(GoToSignupPage);
        $('#login').click(GoToLoginPage);
    } else {
        $('#topbar-container').html($('#user_center_container').html());
        $('#logout').click(UserLogout);
    }
}

// 用户登出
function UserLogout() {
    Cookies.remove('X-Token');
    ShowAlertAutoClose('登出成功', '登出成功');
    SetSignStatus();
}

// 初始化处理
$(document).ready(function () {
    SetSignStatus();
});
