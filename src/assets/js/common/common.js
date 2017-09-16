
// UTC时间去掉'T', '+'
function FormatTime(time) {
    return time.replace(/[T+]/g, " ")
}

// 获取URL string类型参数
function GetURIParamStr(url, key) {
    if (url.indexOf("?") === -1) {
        return "";
    }
    url = url.substr(url.indexOf("?"))
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = url.substr(1).match(reg);
    if (r !== null) return unescape(r[2]); return "";
}

// 获取URL int类型参数
function GetURIParamInt(url, key) {
    return parseInt(GetURIParamStr(url, key)) || 0;
}

// 跳转到指定页面
function GoToPage(relativePath) {
    location.href = location.protocol + "//" + location.host + relativePath;
}

// 跳转到来源页面, URI: http://localhost/login.html?from=www.xxx.com
function GoToFromPage() {
    if (location.href.indexOf("from=") === -1) {
        GoToIndexPage();
    } else {
        location.href = location.href.substring(location.href.indexOf("from=") + "from=".length);
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

// ajax操作函数, 不需要token
function AjaxNoAuth(url, method, data, error, success) {
    if (!data) {
        $.ajax({
            url: url,
            type: method,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: error,
            success: success
        });
    } else {
        $.ajax({
            url: url,
            type: method,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            error: error,
            success: success
        });
    }
}

// ajax操作函数, 需要token
function AjaxWithAuth(url, method, data, error, success) {
    if (!data) {
        $.ajax({
            url: url,
            type: method,
            headers: {"Authorization": Cookies.get('Authorization')},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: error,
            success: success
        });
    } else {
        $.ajax({
            url: url,
            type: method,
            headers: {"Authorization": Cookies.get('Authorization')},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            error: error,
            success: success
        });
    }
}