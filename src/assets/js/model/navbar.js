
var NavbarTemplate = '<header class="am-topbar am-topbar-inverse">\n' +
    '    <h1 class="am-topbar-brand">\n' +
    '        <a href="index.html"><img src="assets/i/logo.png">村讯</a>\n' +
    '    </h1>\n' +
    '\n' +
    '    <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: \'#doc-topbar-collapse\'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>\n' +
    '\n' +
    '    <div class="am-collapse am-topbar-collapse" id="doc-topbar-collapse">\n' +
    '        <ul class="am-nav am-nav-pills am-topbar-nav">\n' +
    '           <li id="NavbarIndexItemContainer"><a href="index.html">首页</li>\n' +
    '        </ul>\n' +
    '\n' +
    '        <form class="am-topbar-form am-topbar-left am-form-inline" role="search">\n' +
    '            <div class="am-form-group">\n' +
    '                <input type="text" class="am-form-field am-input-sm" placeholder="搜索" id="search">\n' +
    '            </div>\n' +
    '        </form>\n' +
    '\n' +
    '        <div class="am-topbar-right" id="UserSignupContainer">\n' +
    '            <a class="am-btn am-btn-primary am-topbar-btn am-btn-sm" href="login.html">登录</a>\n' +
    '            <a class="am-btn am-btn-primary am-topbar-btn am-btn-sm" href="signup.html">注册</a>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="am-topbar-right" id="UserCenterContainer">\n' +
    '            <a class="am-btn am-btn-primary am-topbar-btn am-btn-sm" href="new.html">发帖</a>\n' +
    '            <a class="am-btn am-btn-primary am-topbar-btn am-btn-sm" href="center.html">个人中心</a>\n' +
    '            <a class="am-btn am-btn-primary am-topbar-btn am-btn-sm" id="UserLogoutHandler">登出</a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</header>';

// 初始化登录状态
function NavbarSetSignStatus() {
    if (!Cookies.get('Authorization')) {
        $('#UserSignupContainer').show();
        $('#UserCenterContainer').hide();
    } else {
        $('#UserSignupContainer').hide();
        $('#UserCenterContainer').show();
        $('#UserLogoutHandler').click(UserLogoutHandler);
    }
}

// 用户登出
function UserLogoutHandler() {
    Cookies.remove('Authorization');
    AlertShowAutoCloseAndGoPage('登出成功', '登出成功, 3秒后返回主页', "/index.html");
    return false;
}

// 菜单栏初始化项及状态
function NavbarInit() {
    $('body').prepend($(NavbarTemplate));

    APIColumnGetList(AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            var column_id = GetURIParamInt(location.href, "column_id");
            if (column_id === 0) {  // 首页column_id = 0
                //$("#NavbarIndexItemContainer").addClass("am-active");
                //$(document).attr("title", "首页");
            }
            $.each(data['list'], function (index, item) {
                var url = "list.html?column_id=" + item.id + "&page_size=10&page_num=1";
                var a = $("<a></a>").attr("href", url).text(item.name);
                var li = $("<li></li>");
                if (item.id === column_id) {
                    $(document).attr("title", item.name);
                    li.addClass("am-active");
                }
                $('.am-nav').append(li.append(a))
            })
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function NavbarRender() {
    NavbarInit();
    NavbarSetSignStatus();
}
