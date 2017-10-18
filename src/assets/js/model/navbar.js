
var NavbarTemplate = '<header class="am-topbar am-topbar-inverse">\n' +
    '    <h1 class="am-topbar-brand">\n' +
    '        <a href="index.html"><img src="assets/i/logo.png">' + WebSiteName + '</a>\n' +
    '    </h1>\n' +
    '\n' +
    '    <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: \'#doc-topbar-collapse\'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>\n' +
    '\n' +
    '    <div class="am-collapse am-topbar-collapse" id="doc-topbar-collapse">\n' +
    '        <ul class="am-nav am-nav-pills am-topbar-nav">\n' +
    '        </ul>\n' +
    '\n' +
    '        <form class="am-topbar-form am-topbar-left am-form-inline am-hide" role="search">\n' +
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
    '            <a class="am-btn am-btn-primary am-topbar-btn am-btn-sm" href="admin/article.html?action=create">发帖</a>\n' +
    '            <a class="am-btn am-btn-primary am-topbar-btn am-btn-sm" href="admin/index.html">个人中心</a>\n' +
    '            <a class="am-btn am-btn-primary am-topbar-btn am-btn-sm" id="UserLogoutHandler">登出</a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</header>';

// 初始化其他菜单项
function NavbarItemsRender() {
    var items = [
        {
            name: "首页",
            id: "0",
            url: "index.html?column_id=0&page_size=10&page_num=1"
        },
        {
            name: "资讯",
            id: "1",
            url: "news_list.html?column_id=1&page_size=10&page_num=1"
        },
        {
            name: "贴吧",
            id: "2",
            url: "postbar_list.html?column_id=2&page_size=10&page_num=1"
        },
        {
            name: "租房",
            id: "3",
            url: "rental_list.html?column_id=3&page_size=10&page_num=1"
        },
        {
            name: "拼车",
            id: "4",
            url: "carpooling_list.html?column_id=4&page_size=10&page_num=1"
        },
        {
            name: "公众号",
            id: "5",
            url: "link.html?column_id=5&page_size=10&page_num=1"
        }
    ];
    $.each(items, function (index, item) {
        var a = $("<a></a>").attr("href", item.url).text(item.name);
        var li = $("<li></li>");
        if (item.id === NavbarPageEnv.column_id) {
            $(document).attr("title", WebSiteTitle + item.name);
            li.addClass("am-active");
        }
        $('.am-nav').append(li.append(a))
    })
}

// 页面变量信息
var NavbarPageEnv = {
    creater_uid: createrUidDefault,
    column_id: columnIdDefault,
    order_by: orderByDefault,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

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
    clearLoginCookie();
    AlertShowAutoCloseAndGoPage('登出成功', '登出成功, 3秒后返回主页', "/index.html");
    return false;
}


// 菜单栏初始化项及状态
function NavbarInit() {
    $('body').prepend($(NavbarTemplate));
    NavbarItemsRender();
}

function NavbarGetCurrentEnv(currentUrl) {
    NavbarPageEnv.column_id = GetURIParamIdValue(currentUrl, "column_id") || columnIdDefault;
    NavbarPageEnv.order_by = GetURIParamStr(currentUrl, "order_by") || orderByDefault;
    NavbarPageEnv.page_size = GetURIParamInt(currentUrl, "page_size") || PageSizeDefault;
    NavbarPageEnv.page_num = GetURIParamInt(currentUrl, "page_num") || PageStartNumberDefault;
}

function NavbarRender() {
    NavbarGetCurrentEnv(location.href);
    NavbarInit();
    NavbarSetSignStatus();
}
