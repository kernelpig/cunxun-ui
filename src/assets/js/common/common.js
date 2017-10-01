
function timeFormat(s) {
    if (s >= 0 && s <= 9) {
        return "0" + s;
    }
    return s;
}

// 当地时间格式化输出
function CtsTimeFormat(time) {
    var date = new Date(time);
    var Str = date.getFullYear() + '-' +
        timeFormat(date.getMonth() + 1) + '-' +
        timeFormat(date.getDate()) + ' ' +
        timeFormat(date.getHours()) + ':' +
        timeFormat(date.getMinutes()) + ':' +
        timeFormat(date.getSeconds());
    return Str;
}

// 获取unix时间戳, 单位秒
function GetUnixTimestampOfSecond(dateTime) {
    return new Date(dateTime).getTime() / 1000;
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

// 获取URL id类型参数
function GetURIParamIdValue(url, key) {
    return GetURIParamStr(url, key);
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

// 普通用户只获取自己创建的, 管理员及以上用户则获取所有的
function getCreaterUid() {
    if (!Cookies.get("UserRole") || Cookies.get("UserRole") === userRoleNormal) {
        return Cookies.get("UserId");
    }
    return createrUidDefault;
}

// 重置登录状态
function resetLoginCookie() {
    Cookies.remove("Authorization");
    Cookies.remove("UserId");
    Cookies.remove("UserRole");
}