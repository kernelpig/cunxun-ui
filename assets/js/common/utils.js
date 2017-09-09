
// 获取URL参数
function GetURLParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

// 跳转到指定页面
function GoToPage(relativePath) {
    location.href = location.protocol + "//" + location.host + relativePath;
}

// 跳转到来源页面, URI: http://localhost/login.html?from=www.xxx.com
function GoToFromPage() {
    if (!GetURLParam('from')) {
        GoToIndexPage();
    } else {
        location.href = GetURLParam('from');
    }
}

// 跳转到注册页面
function GoToSignupPage() {
    GoToPage("/signup.html");
}

// 跳转到首页
function GoToIndexPage() {
    GoToPage("/index.html");
}

// 跳转到登录页面
function GoToLoginPage(isAddFrom) {
    if (isAddFrom) {
        GoToPage("/login.html?from="+location.href);
    } else {
        GoToPage("/login.html");
    }
}

// 未登录跳转到首页
function IsLogined() {
    if (!Cookies.get('Authorization')) {
        GoToLoginPage();
    }
}