
var ArticleDetailTemplate = '<article class="am-article">\n' +
    '    <div class="am-article-hd">\n' +
    '        <h1 class="am-article-title"></h1>\n' +
    '        <p class="am-article-meta"></p>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="am-article-bd">\n' +
    '        <p class="am-article-lead"></p>\n' +
    '    </div>\n' +
    '</article>';

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
    $(".ContentContainer").append(ArticleDetailTemplate);
    ArticleGetHandler();
});