
// 服务端各模块URI
var serviceBaseURI      = "http://localhost:8005/api";
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

// 创建栏目
function APIColumnCreate(data, error, success) {
    var url = columnBaseURI + "/";
    AjaxWithAuth(url, "post", data, error, success);
}

// 根据ID修改栏目
function APIColumnUpdateById(columnId, data, error, success) {
    var url = columnBaseURI + "/" + columnId;
    AjaxWithAuth(url, "put", data, error, success);
}

// 根据ID删除栏目
function APIColumnDeleteById(columnId, error, success) {
    var url = columnBaseURI + "/" + columnId;
    AjaxWithAuth(url, "delete", null, error, success);
}

// 获取评论列表
function APICommentGetList(data, error, success) {
    var url = commentBaseURI + "/?creater_uid=" + data.creater_uid + "&article_id=" + data.article_id +
        "&page_size=" + data.page_size + "&page_num=" + data.page_num;
    AjaxNoAuth(url, "get", null, error, success);
}

// 根据ID修改评论
function APICommentUpdateById(commentId, data, error, success) {
    var url = commentBaseURI + "/" + commentId;
    AjaxWithAuth(url, "put", data, error, success);
}

// 根据ID删除评论
function APICommentDeleteById(commentId, error, success) {
    var url = commentBaseURI + "/" + commentId;
    AjaxWithAuth(url, "delete", null, error, success);
}

// 获取文章列表
function APIArticleGetList(data, error, success) {
    var url = articleBaseURI + "/?creater_uid=" + data.creater_uid + "&column_id=" + data.column_id + "&order_by=" + data.order_by +
        "&page_size=" + data.page_size + "&page_num=" + data.page_num;
    AjaxNoAuth(url, "get", null, error, success);
}

// 获取文章内容
function APIArticleGetItem(data, error, success) {
    var url = articleBaseURI + "/" + data.article_id;
    AjaxNoAuth(url, "get", null, error, success);
}

// 根据ID修改文章
function APIArticleUpdateById(articleId, data, error, success) {
    var url = articleBaseURI + "/" + articleId;
    AjaxWithAuth(url, "put", data, error, success);
}

// 根据ID删除文章
function APIArticleDeleteById(articleId, error, success) {
    var url = articleBaseURI + "/" + articleId;
    AjaxWithAuth(url, "delete", null, error, success);
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

// 用户获取
function APIUserGetInfo(userId, error, success) {
    var url = userBaseURI + "/" + userId;
    AjaxWithAuth(url, "get", null, error, success);
}

// 用户注册
function APIUserSignup(data, error, success) {
    var url = userBaseURI + "/signup";
    AjaxNoAuth(url, "post", data, error, success);
}

// 栏目获取列表
function APIColumnGetList(data, error, success) {
    var url = columnBaseURI + "/?creater_uid=" + data.creater_uid;
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