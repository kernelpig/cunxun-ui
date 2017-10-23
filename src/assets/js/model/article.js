
var ArticleDetailTemplate = '<article class="am-article am-margin-top">\n' +
    '    <div class="am-article-hd am-text-center">\n' +
    '        <h1 class="am-article-title am-text-primary"></h1>\n' +
    '        <hr><p class="am-article-meta"></p>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="ArticleContentContainer">\n' +
    '    </div>\n' +
    '</article>';

var ArticleDetailEnv = {
    "article_id": 0
};

function ArticleGetHandler() {
    var req = {
        "article_id": ArticleDetailEnv.article_id
    };
    APIArticleGetItem(req, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            if (!data["list"] || data["list"].length <= 0) {
                return
            }
            var item = data["list"][0];
            $(document).attr("title", item.title + WebSiteTitle);
            $(".am-article-title").text(item.title);
            $(".ArticleContentContainer").html(parseSpecialChar(item.content));
            var userLink = "/user.html?user_id=" + item.updater_uid;
            $(".am-article-meta").append("发布作者: &nbsp;");
            $(".am-article-meta").append($("<a></a>").text(item.nickname).attr("href", userLink));
            $(".am-article-meta").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布时间: &nbsp;");
            $(".am-article-meta").append(CtsTimeFormat(item.updated_at));
            $(".am-article-meta").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论次数: &nbsp;" + item.comment_count);
        } else {
            AlertShowError(data["sub_error"]);
        }
    });
}

function ArticleCurrentEnv(currentUrl) {
    ArticleDetailEnv.article_id = GetURIParamIdValue(currentUrl, "article_id") || articleIdDefault
}

function AriticleDetailRender(currentUrl) {
    $(".ContentContainer").append(ArticleDetailTemplate);
    ArticleCurrentEnv(currentUrl);
    ArticleGetHandler();
}