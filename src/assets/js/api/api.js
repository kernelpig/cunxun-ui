
// 服务端各模块URI
var serviceBaseURI      = "http://localhost:8005";
var captchaBaseURI      = serviceBaseURI + "/captcha";
var userBaseURI         = serviceBaseURI + "/u";
var checkcodeBaseURI    = serviceBaseURI + "/checkcode";
var articleBaseURI      = serviceBaseURI + "/article";
var columnBaseURI       = serviceBaseURI + "/column";
var commentBaseURI      = serviceBaseURI + "/comment";

// 创建评论
function APICommentCreate(data, error, success) {
    var url = commentBaseURI + "/";
    AjaxWithAuth(url, "post", data, error, success);
}

// 获取评论列表
function APICommentGetList(data, error, success) {
    var url = commentBaseURI + "/?article_id=" + data.article_id +
        "&page_size=" + data.page_size + "&page_num=" + data.page_num;
    AjaxNoAuth(url, "get", null, error, success);
}

// 获取文章列表
function APIArticleGetList(data, error, success) {
    var url = articleBaseURI + "/?column_id=" + data.column_id + "&order_by=" + data.order_by +
        "&page_size=" + data.page_size + "&page_num=" + data.page_num;
    AjaxNoAuth(url, "get", null, error, success);
}

// 获取文章内容
function APIArticleGetItem(data, error, success) {
    var url = articleBaseURI + "/" + data.article_id;
    AjaxNoAuth(url, "get", null, error, success);
}

// 获取图形验证码ID
function APICaptchaGetID(error, success) {
    var url = captchaBaseURI + "/";
    AjaxNoAuth(url, "post", null, error, success);
}

// 用户登录
function APIUserLogin(data, error, success) {
    var url = userBaseURI + "/login";
    AjaxNoAuth(url, "post", data, error, success);
}

// 用户注册
function APIUserSignup(data, error, success) {
    var url = userBaseURI + "/signup";
    AjaxNoAuth(url, "post", data, error, success);
}

// 栏目获取列表
function APIColumnGetList(error, success) {
    var url = columnBaseURI + "/";
    AjaxNoAuth(url, "get", null, error, success);
}

// 文章创建
function APIArticleCreate(data, error, success) {
    var url = articleBaseURI + "/";
    AjaxWithAuth(url, "post", data, error, success);
}

// 验证码发送
function APICheckcodeSend(data, error, success) {
    var url = checkcodeBaseURI + "/send";
    AjaxNoAuth(url, "post", data, error, success);
}

// 验证码校验
function APICheckcodeCheck(data, error, success) {
    var url = checkcodeBaseURI + "/check";
    AjaxNoAuth(url, "post", data, error, success);
}