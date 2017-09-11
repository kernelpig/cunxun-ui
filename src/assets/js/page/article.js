
function ArticleGetHandler() {
    var req = {
        "article_id": GetURIParamInt("id")
    };
    APIArticleGetItem(req, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            $(".am-article-title").text(data["item"].title);
            $(".am-article-bd").text(data["item"].content);
        } else {
            AlertShowError(data["sub_error"]);
        }
    });
}

$(document).ready(function () {
    ArticleGetHandler();
});