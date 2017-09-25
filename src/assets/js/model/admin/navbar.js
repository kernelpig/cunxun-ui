
var NavbarTemplate = '<header class="am-topbar am-topbar-inverse">\n' +
    '    <h1 class="am-topbar-brand">\n' +
    '        <a href="index.html"><img src="../assets/i/logo.png">村讯</a>\n' +
    '    </h1>\n' +
    '\n' +
    '    <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: \'#doc-topbar-collapse\'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>\n' +
    '\n' +
    '    <div class="am-collapse am-topbar-collapse" id="doc-topbar-collapse">\n' +
    '        <ul class="am-nav am-nav-pills am-topbar-nav">\n' +
    '           <li><a href="index.html">首页</li>\n' +
    '           <li><a href="user.html">个人</li>\n' +
    '        </ul>\n' +
    '\n' +
    '        <form class="am-topbar-form am-topbar-left am-form-inline" role="search">\n' +
    '            <div class="am-form-group">\n' +
    '                <input type="text" class="am-form-field am-input-sm" placeholder="搜索" id="search">\n' +
    '            </div>\n' +
    '        </form>\n' +
    '\n' +
    '        <div class="am-topbar-right" id="UserCenterContainer">\n' +
    '            <a class="am-btn am-btn-primary am-topbar-btn am-btn-sm" id="BacktoWebsite">返回网站</a>\n' +
    '            <a class="am-btn am-btn-primary am-topbar-btn am-btn-sm" id="UserLogoutHandler">登出</a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</header>';

// 初始化登录状态
function NavbarSetSignStatus() {
    $('#UserLogoutHandler').click(UserLogoutHandler);
    $('#BacktoWebsite').click(function () {
        GoToIndexPage();
    });
}

// 用户登出
function UserLogoutHandler() {
    Cookies.remove('Authorization');
    AlertShowAutoCloseAndGoPage('登出成功', '登出成功, 3秒后返回主页', "/index.html");
    return false;
}

var NavbarItems = [
    {
        id: typeIdUser,
        name: "用户",
        url: "user_list.html"
    },
    {
        id: typeIdColumn,
        name: "栏目",
        url: "column_list.html"
    },
    {
        id: typeIdArticle,
        name: "文章",
        url: "article_list.html"
    },
    {
        id: typeIdComment,
        name: "评论",
        url: "comment_list.html"
    }
];

function NavbarInitData() {
    var type_id = GetURIParamInt(location.href, "type_id");
    if (type_id === 0) {
        if ((location.href.indexOf("index.html") !== -1) || (location.href.indexOf(".html") === -1)) {
            $("#NavbarIndexItemContainer").addClass("am-active");
            $(document).attr("title", "个人管理中心");
        }
    }
    $.each(NavbarItems, function (index, item) {
        var url = item.url + "?type_id=" + item.id + "&page_size=10&page_num=1";
        var a = $("<a></a>").attr("href", url).text(item.name);
        var li = $("<li></li>");
        if (item.id === type_id) {
            $(document).attr("title", item.name);
            li.addClass("am-active");
        }
        $('.am-nav').append(li.append(a))
    })
}

// 菜单栏初始化项及状态
function NavbarInit() {
    $('body').prepend($(NavbarTemplate));
    NavbarInitData();
}

function NavbarRender() {
    NavbarInit();
    NavbarSetSignStatus();
}
