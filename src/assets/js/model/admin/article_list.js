var ArticleListTemplate = '<table class="am-table am-table-striped am-table-compact am-text-sm am-text-primary">\n' +
    '        <thead>\n' +
    '        <tr>\n' +
    '            <th class="am-show-lg-up">ID</th>\n' +
    '            <th>标题</th>\n' +
    '            <th class="am-show-lg-up">作者</th>\n' +
    '            <th class="am-show-lg-up">时间</th>\n' +
    '            <th>操作</th>\n' +
    '        </tr>\n' +
    '        </thead>\n' +
    '        <tbody class="ListItemsContainer">\n' +
    '        </tbody>\n' +
    '    </table>\n' +
    '    <!--更多在底部-->\n' +
    '    <div class="am-list-news-ft">\n' +
    '        <a class="am-list-news-more am-btn am-btn-default ArticleGetMoreHandler" href="###">查看更多 &raquo;</a>\n' +
    '    </div>';

var ArticleListItemTemplate = '<tr>\n' +
    '            <td class="am-show-lg-up"><a class="ArticleListItemID"></a></td>\n' +
    '            <td><a class="ArticleListItemName"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="ArticleListItemAuthor"></a></td>\n' +
    '            <td class="ArticleListItemTime am-show-lg-up"></td>\n' +
    '            <td>\n' +
    '                <a class="am-btn am-btn-xs am-btn-default am-icon-pencil ArticleListItemUpdate">修改</a>\n' +
    '                <a class="am-btn am-btn-xs am-btn-primary am-icon-trash ArticleListItemDelete">删除</a>\n' +
    '            </td>\n' +
    '        </tr>\n';

function ArticleGetListHandler() {
    APIArticleGetList(ArticleListPageEnv, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            ArticleListPageEnv.is_end = data['end'];
            if (!data["list"] || data["list"].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
                return
            }
            ArticleListPageEnv.page_num += 1;
            $.each(data['list'], function (index, item) {
                var navbarItem = $(ArticleListItemTemplate);
                var articleUrl = "../article.html?article_id=" + item.id;
                navbarItem.find(".ArticleListItemID").text(item.id);
                navbarItem.find(".ArticleListItemID").attr("href", articleUrl);
                navbarItem.find(".ArticleListItemName").text(item.title);
                navbarItem.find(".ArticleListItemName").attr("href", articleUrl);
                navbarItem.find(".ArticleListItemAuthor").text(item.nickname);
                navbarItem.find(".ArticleListItemTime").text(CtsTimeFormat(item.created_at));
                var updateUrl = "article.html?action=update&article_id=" + item.id;
                navbarItem.find(".ArticleListItemUpdate").attr("href", updateUrl);
                navbarItem.find(".ArticleListItemDelete").attr("alt", item.id);
                $(".ListItemsContainer").append(navbarItem);
            });
            $(".ArticleListItemDelete").click(ArticleDeleteHandler);
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
    ArticleListPageEnv.type_id = GetURIParamInt(currentUrl, "type_id") || typeIdDefault;
    ArticleListPageEnv.order_by = GetURIParamStr(currentUrl, "order_by") || orderByDefault;
    ArticleListPageEnv.page_size = GetURIParamInt(currentUrl, "page_size") || PageSizeDefault;
    ArticleListPageEnv.page_num = GetURIParamInt(currentUrl, "page_num") || PageStartNumberDefault;
}

var ArticleListPageEnv = {
    type_id: typeIdDefault,
    creater_uid: getCreaterUid(),
    column_id: columnIdDefault,
    article_id: articleIdDefault,
    order_by: orderByDefault,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

function ArticleListRender(currentUrl) {
    $(".ContentContainer").append(ArticleListTemplate);
    ArticleListPageGetCurrentEnv(currentUrl);
    if (ArticleListPageEnv.order_by === orderByCommentCount) {
        $(".ArticleListTitle").text("热度排序");
    } else {
        $(".ArticleListTitle").text("时间排序");
    }
    ArticleGetListHandler();
    $(".ArticleGetMoreHandler").click(ArticleGetMoreHandler);
}