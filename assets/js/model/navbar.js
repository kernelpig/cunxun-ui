
var NavbarTemplate = '<header class="am-topbar am-topbar-inverse">\n' +
    '    <h1 class="am-topbar-brand">\n' +
    '        <a href="index.html"><img src="assets/i/logo.png">村讯</a>\n' +
    '    </h1>\n' +
    '\n' +
    '    <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: \'#doc-topbar-collapse\'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>\n' +
    '\n' +
    '    <div class="am-collapse am-topbar-collapse" id="doc-topbar-collapse">\n' +
    '        <ul class="am-nav am-nav-pills am-topbar-nav">\n' +
    '        </ul>\n' +
    '\n' +
    '        <form class="am-topbar-form am-topbar-left am-form-inline" role="search">\n' +
    '            <div class="am-form-group">\n' +
    '                <input type="text" class="am-form-field am-input-sm" placeholder="搜索" id="search">\n' +
    '            </div>\n' +
    '        </form>\n' +
    '\n' +
    '        <div class="am-topbar-right" id="UserSignupContainer">\n' +
    '            <button class="am-btn am-btn-primary am-topbar-btn am-btn-sm" id="UserLoginLink">登录</button>\n' +
    '            <button class="am-btn am-btn-primary am-topbar-btn am-btn-sm" id="UserSignupLink">注册</button>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="am-topbar-right" id="UserCenterContainer">\n' +
    '            <button class="am-btn am-btn-primary am-topbar-btn am-btn-sm" id="UserLogoutHandler">登出</button>\n' +
    '            <button class="am-btn am-btn-primary am-topbar-btn am-btn-sm" id="UserLogoutHandler">个人中心</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</header>';

// 初始化登录状态
function NavbarSetSignStatus() {
    if (!Cookies.get('Authorization')) {
        $('#UserSignupContainer').show();
        $('#UserCenterContainer').hide();
        $('#UserSignupLink').click(GoToSignupPage);
        $('#UserLoginLink').click(GoToLoginPage);
    } else {
        $('#UserSignupContainer').hide();
        $('#UserCenterContainer').show();
        $('#UserLogoutHandler').click(UserLogoutHandler);
    }
}

// 用户登出
function UserLogoutHandler() {
    Cookies.remove('Authorization');
    ShowAlertAutoClose('登出成功', '登出成功');
    NavbarSetSignStatus();
    GoToIndexPage();
}

var NavbarColumns = [
    {id: 0, name: "首页"},
    {id: 1, name: "资讯"},
    {id: 2, name: "贴吧"},
    {id: 3, name: "拼车"},
    {id: 4, name: "交友"},
    {id: 5, name: "招聘"}
];

// 菜单栏初始化项及状态
function NavbarInit() {
    $('body').prepend($(NavbarTemplate));
    var column_id = GetURIParamInt("column_id");
    $.each(NavbarColumns, function (index, item) {
        var url = "list.html?column_id=" + item.id + "&page_size=10&page_num=1";
        var a = $("<a></a>").attr("href", url).text(item.name);
        var li = $("<li></li>");
        if (item.id === column_id) {
            $(document).attr("title", item.name);
            li.addClass("am-active");
        }
        $('.am-nav').append(li.append(a))
    })
}

// 初始化处理
$(document).ready(function () {
    NavbarInit();
    NavbarSetSignStatus();
});
