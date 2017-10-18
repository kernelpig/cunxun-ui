var ArticleListTemplate = '<div data-am-widget="list_news" class="am-list-news am-list-news-default" >\n' +
    '    <!--列表标题-->\n' +
    '    <div class="am-list-news-hd am-cf">\n' +
    '        <!--带更多链接-->\n' +
        '            <button class="am-btn am-btn-sm ArticleListTitle ArticleListOrderByCreateDate">最新</button>\n' +
        '            <button class="am-btn am-btn-sm ArticleListTitle ArticleListOrderByCommentCount">最热</button>\n' +
    '    </div>\n' +
    '    <div class="am-list-news-bd">\n' +
    '        <ul class="am-list">\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '    <!--更多在底部-->\n' +
    '    <div class="am-list-news-ft">\n' +
    '        <button class="am-list-news-more am-btn am-btn-primary am-btn-sm" id="ArticleGetMoreHandler">查看更多 &raquo;</button>\n' +
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

// 获取置顶标签
function getToppingFlag(priority, index) {
    var priorityClass = ["am-badge-danger", "am-badge-warning", "am-badge-success"];
    var listItem = '<a class="am-list-item-text am-text-center am-text-truncate am-u-sm-2 am-u-md-1"></a>';
    var badge = '<span class="am-badge am-radius am-text-xs"></span>';
    if (priority > 0) {
        var subIndex = index % priorityClass.length;
        badge = '<span class="am-badge am-radius am-text-xs ' + priorityClass[subIndex] + '">置顶</span>';
    }
    return $(listItem).append(badge);
}

// 获取热度排序几置顶标签
function getHottingFlag(priority, index) {
    var priorityClass = ["am-badge-danger", "am-badge-warning", "am-badge-success"];
    var listItem = '<a class="am-list-item-text am-text-left am-text-truncate am-u-sm-2 am-u-md-1"></a>';
    // 处理置顶标签
    var badge = '<span class="am-badge am-radius am-text-xs"></span>';
    if(priority > 0) {
        var subIndex = index % priorityClass.length;
        badge = '<span class="am-badge am-radius am-text-xs ' + priorityClass[subIndex] + '">置顶</span>';
    }
    // 处理top3标签
    if(index >= 0 && index <= priorityClass.length - 1) {
        badge = badge + '  <span class="am-badge am-round am-text-xs ' + priorityClass[index] + '">' + (index+1) + '</span>';
    } else {
        badge = badge + '  <span class="am-badge am-round am-text-xs"></span>';
    }
    return $(listItem).append(badge);
}

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
                $.each(data['list'], function (index, item) {
                    var href = 'article.html?article_id=' + this.id;
                    var link = $('<a class="am-list-item-text am-text-truncate am-u-sm-10 am-u-md-6 am-padding-left-sm"></a>').attr('href', href).text(this.title);
                    var author = $('<a class="am-list-item-text am-text-truncate am-u-md-2 am-show-lg-up am-text-center"></a>').text(this.nickname);
                    var stat = $('<a class="am-list-item-text am-text-truncate am-u-md-1 am-show-lg-up am-text-center"></a>').text(this.comment_count);
                    var time = $('<a class="am-list-item-text am-text-truncate am-u-md-2 am-show-lg-up am-text-center"></a>').text(CtsTimeFormat(this.updated_at));
                    var topping = getToppingFlag(this.priority, index);
                    if (ArticleListPageEnv.order_by === orderByCommentCount) {
                        topping = getHottingFlag(this.priority, index);
                    }
                    var li = $('<li class="am-g"></li>').append(link).append(author).append(stat).append(time).append(topping);
                    $(".am-list").append(li);
                });
                gotoPageBottom();
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

function ArticleListButtonToggle() {
    if (ArticleListPageEnv.order_by === orderByCommentCount) {
        $(".ArticleListOrderByCommentCount").addClass("am-btn-primary");
        $(".ArticleListOrderByCreateDate").removeClass("am-btn-primary").addClass("am-btn-default");
    } else {
        $(".ArticleListOrderByCreateDate").addClass("am-btn-primary");
        $(".ArticleListOrderByCommentCount").removeClass("am-btn-primary").addClass("am-btn-default");
    }
    $(".am-list").html("");
    ArticleGetListHandler();
}

function ArticleListLinkRender() {
    $(".ArticleListOrderByCommentCount").click(function () {
        ArticleListPageEnv.order_by = orderByCommentCount;
        ArticleListPageEnv.page_num = PageStartNumberDefault;
        ArticleListButtonToggle();
    });
    $(".ArticleListOrderByCreateDate").click(function () {
        ArticleListPageEnv.order_by = orderByCreateDate;
        ArticleListPageEnv.page_num = PageStartNumberDefault;
        ArticleListButtonToggle();
    });
}

function ArticleListRender(currentUrl) {
    $(".ContentContainer").append(ArticleListTemplate);
    ArticleListPageGetCurrentEnv(currentUrl);
    ArticleListLinkRender();
    ArticleListButtonToggle();
    $('#ArticleGetMoreHandler').click(ArticleGetMoreHandler);
}