var TypeListTemplate = '<table class="am-table am-table-striped am-table-compact am-text-sm am-text-primary">\n' +
    '        <thead>\n' +
    '        <tr>\n' +
    '            <th class="am-show-lg-up">ID</th>\n' +
    '            <th>名称</th>\n' +
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
    '        <a class="am-list-news-more am-btn am-btn-default TypeGetMoreHandler" href="###">查看更多 &raquo;</a>\n' +
    '    </div>';

var TypeListItemTemplate = '<tr>\n' +
    '            <td class="am-show-lg-up"><a class="TypeListItemID"></a></td>\n' +
    '            <td><a class="TypeListItemName"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="TypeListItemAuthor"></a></td>\n' +
    '            <td class="TypeListItemTime am-show-lg-up"></td>\n' +
    '            <td>\n' +
    '                <a class="am-btn am-btn-xs am-btn-default am-icon-pencil TypeListItemUpdate">修改</a>\n' +
    '                <a class="am-btn am-btn-xs am-btn-primary am-icon-trash TypeListItemDelete">删除</a>\n' +
    '            </td>\n' +
    '        </tr>\n';

function TypeGetListHandler() {
    if (TypeListPageEnv.type_id === typeIdColumn) {
        NavbarItemColumnGetList();
    } else if (TypeListPageEnv.type_id === typeIdArticle) {
        NavbarItemArticleGetList(TypeListPageEnv);
    } else if (TypeListPageEnv.type_id === typeIdComment) {
        NavbarItemCommentGetList(TypeListPageEnv);
    }
}

function TypeGetMoreHandler() {
    if (!TypeListPageEnv.is_end) {
        TypeGetListHandler();
    } else {
        AlertShowAutoClose("请知晓", "亲,无更多数据");
    }
}

function TypeListPageGetCurrentEnv(currentUrl) {
    TypeListPageEnv.type_id = GetURIParamInt(currentUrl, "type_id") || typeIdDefault;
    TypeListPageEnv.order_by = GetURIParamStr(currentUrl, "order_by") || orderByDefault;
    TypeListPageEnv.page_size = GetURIParamInt(currentUrl, "page_size") || PageSizeDefault;
    TypeListPageEnv.page_num = GetURIParamInt(currentUrl, "page_num") || PageStartNumberDefault;
}

var TypeListPageEnv = {
    type_id: typeIdDefault,
    column_id: columnIdDefault,
    article_id: articleIdDefault,
    order_by: orderByDefault,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

function TypeListRender(currentUrl) {
    $(".ContentContainer").append(TypeListTemplate);
    TypeListPageGetCurrentEnv(currentUrl);
    if (TypeListPageEnv.order_by === orderByCommentCount) {
        $(".TypeListTitle").text("热度排序");
    } else {
        $(".TypeListTitle").text("时间排序");
    }
    TypeGetListHandler();
    $(".TypeGetMoreHandler").click(TypeGetMoreHandler);
}