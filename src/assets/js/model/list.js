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

var ArticleListPageEnv = {
    creater_uid: createrUidDefault,
    column_id: columnIdDefault,
    order_by: orderByDefault,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

function ArticleGetListHandler() {
    APIArticleGetList(ArticleListPageEnv, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            ArticleListPageEnv.is_end = data['end'];
            if (!data['list'] || data['list'].length === 0) {
                if (ArticleListPageEnv.page_num > 1) {
                    // 初始化时不显示alert, 只有点击更多时显示
                    AlertShowAutoClose("请知晓", "亲,无更多数据");
                }
            } else {
                ArticleListPageEnv.page_num += 1;
                $.each(data['list'], function () {
                    var href = 'article.html?article_id=' + this.id;
                    var link = $('<a class="am-list-item-hd am-text-truncate am-u-sm-12 am-u-md-7 am-padding-left-sm"></a>').attr('href', href).text(this.title);
                    var author = $('<span class="am-list-author am-text-truncate am-u-md-2 am-show-lg-up am-text-center"></span>').text(this.nickname);
                    var stat = $('<span class="am-list-stat am-u-md-1 am-show-lg-up am-text-center"></span>').text(this.comment_count);
                    var time = $('<span class="am-list-date am-u-md-2 am-show-lg-up am-text-center"></span>').text(CtsTimeFormat(this.updated_at));
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
        AlertShowAutoClose("请知晓", "亲,无更多数据");
    }
}

function ArticleListPageGetCurrentEnv(currentUrl) {
    ArticleListPageEnv.column_id = GetURIParamIdValue(currentUrl, "column_id") || columnIdDefault;
    ArticleListPageEnv.order_by = GetURIParamStr(currentUrl, "order_by") || orderByDefault;
    ArticleListPageEnv.page_size = GetURIParamInt(currentUrl, "page_size") || PageSizeDefault;
    ArticleListPageEnv.page_num = GetURIParamInt(currentUrl, "page_num") || PageStartNumberDefault;
}

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