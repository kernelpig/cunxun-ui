
function ArticleGetListHandler() {
    APIArticleGetList(ArticleListPageEnv, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            ArticleListPageEnv.is_end = data['end'];
            ArticleListPageEnv.page_num += 1;
            if (!data['list'] || data['list'].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
            } else {
                $.each(data['list'], function () {
                    var href = 'article.html?article_id=' + this.id;
                    var link = $('<a class="am-list-item-hd"></a>').attr('href', href).text(this.title);
                    var span = $('<span class="am-list-date"></span>').text(FormatTime(this.updated_at));
                    $(".am-list").append($('<li class="am-g"></li>').append(link).append(span));
                });
            }
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function ArticleGetMoreHandler() {
    if (!ArticleListPageEnv.is_end) {
        ArticleGetListHandler();
    } else {
        AlertShowAutoClose("请知晓", "亲,无更多数据");
    }
}

function ArticleListPageGetCurrentEnv() {
    ArticleListPageEnv.column_id = GetURIParamInt("column_id");
    ArticleListPageEnv.page_size = GetURIParamInt("page_size") || PageSizeDefault;
    ArticleListPageEnv.page_num = GetURIParamInt("page_num") || PageStartNumberDefault;
}

var ArticleListPageEnv = {
    column_id: 0,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

$(document).ready(function () {
    ArticleListPageGetCurrentEnv();
    ArticleGetListHandler();
    $('#ArticleGetMoreHandler').click(ArticleGetMoreHandler);
});