
function ArticleGetListHandler() {
    APIArticleGetList(ListPageEnv, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            ListPageEnv.is_end = data['end'];
            ListPageEnv.page_num += 1;
            if (!data['list'] || data['list'].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
            } else {
                $.each(data['list'], function () {
                    var href = 'article.html?id=' + this.id;
                    var link = $('<a class="am-list-item-hd"></a>').attr('href', href).text(this.title);
                    $(".am-list").append($('<li class="am-g"></li>').append(link));
                });
            }
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function ArticleGetMoreHandler() {
    if (!ListPageEnv.is_end) {
        ArticleGetListHandler();
    } else {
        AlertShowAutoClose("请知晓", "亲,无更多数据");
    }
}

function ListPageGetCurrentEnv() {
    ListPageEnv.column_id = GetURIParamInt("column_id");
    ListPageEnv.page_size = GetURIParamInt("page_size");
    ListPageEnv.page_num = GetURIParamInt("page_num");
}

var ListPageEnv = {
    column_id: 0,
    page_size: 10,
    page_num: 1,
    is_end: false
};

$(document).ready(function () {
    ListPageGetCurrentEnv();
    ArticleGetListHandler();
    $('#ArticleGetMoreHandler').click(ArticleGetMoreHandler);
});