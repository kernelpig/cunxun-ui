var ArticleListTemplate = '<div data-am-widget="list_news" class="am-list-news am-list-news-default" >\n' +
    '    <!--列表标题-->\n' +
    '    <div class="am-list-news-hd am-cf">\n' +
    '        <!--带更多链接-->\n' +
    '        <a href="###" class="">\n' +
        '            <h2 class="ArticleListTitle">最新</h2>\n' +
    '        </a>\n' +
    '    </div>\n' +
    '    <div class="am-list-news-bd">\n' +
    '        <ul class="am-list">\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '    <!--更多在底部-->\n' +
    '    <div class="am-list-news-ft">\n' +
    '        <a class="am-list-news-more am-btn am-btn-default" id="ArticleGetMoreHandler" href="###">查看更多 &raquo;</a>\n' +
    '    </div>\n' +
    '</div>';

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
                    var author = $('<span class="am-list-author"></span>').text(this.nickname);
                    var stat = $('<span class="am-list-stat"></span>').text(this.comment_count);
                    var time = $('<span class="am-list-date"></span>').text(GMT2Beijing(this.updated_at));
                    $(".am-list").append($('<li class="am-g"></li>').append(link).append(author).append(stat).append(time));
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
        //AlertShowAutoClose("请知晓", "亲,无更多数据");
    }
}

function ArticleListPageGetCurrentEnv(currentUrl) {
    ArticleListPageEnv.column_id = GetURIParamInt(currentUrl, "column_id") || columnIdDefault;
    ArticleListPageEnv.order_by = GetURIParamStr(currentUrl, "order_by") || orderByDefault;
    ArticleListPageEnv.page_size = GetURIParamInt(currentUrl, "page_size") || PageSizeDefault;
    ArticleListPageEnv.page_num = GetURIParamInt(currentUrl, "page_num") || PageStartNumberDefault;
}

var ArticleListPageEnv = {
    column_id: columnIdDefault,
    order_by: orderByDefault,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

function ArticleListRender(currentUrl) {
    $(".ContentContainer").append(ArticleListTemplate);
    ArticleListPageGetCurrentEnv(currentUrl);
    if (ArticleListPageEnv.order_by === orderByCommentCount) {
        $(".ArticleListTitle").text("最近热贴");
    } else {
        $(".ArticleListTitle").text("最近更新");
    }
    ArticleGetListHandler();
    $('#ArticleGetMoreHandler').click(ArticleGetMoreHandler);
}