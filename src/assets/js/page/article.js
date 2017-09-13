
function ArticleGetHandler() {
    var req = {
        "article_id": GetURIParamInt("article_id")
    };
    APIArticleGetItem(req, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            $(document).attr("title", data["item"].title);
            $(".am-article-title").text(data["item"].title);
            $(".am-article-bd").text(data["item"].content);
            var userLink = "/user.html?user_id="+data["item"].updater_uid;
            $(".am-article-meta").append($("<a></a>").text(data["item"].nickname).attr("href", userLink));
            $(".am-article-meta").append(" " + FormatTime(data["item"].updated_at));
        } else {
            AlertShowError(data["sub_error"]);
        }
    });
}

$(document).ready(function () {
    ArticleGetHandler();
});