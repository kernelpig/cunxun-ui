var ColumnListTemplate = '<table class="am-table am-table-striped am-table-compact am-text-sm am-text-primary">\n' +
    '        <thead>\n' +
    '        <tr>\n' +
    '            <th class="am-show-lg-up">ID</th>\n' +
    '            <th>栏目名称</th>\n' +
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
    '        <button class="am-list-news-more am-btn am-btn-primary am-btn-sm ColumnGetMoreHandler">查看更多 &raquo;</button>\n' +
    '    </div>';

var ColumnListItemTemplate = '<tr>\n' +
    '            <td class="am-show-lg-up"><a class="ColumnListItemID"></a></td>\n' +
    '            <td><a class="ColumnListItemName"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="ColumnListItemAuthor"></a></td>\n' +
    '            <td class="ColumnListItemTime am-show-lg-up"></td>\n' +
    '            <td>\n' +
    '                <a class="am-btn am-btn-xs am-btn-default am-icon-pencil ColumnListItemUpdate">修改</a>\n' +
    '                <a class="am-btn am-btn-xs am-btn-primary am-icon-trash ColumnListItemDelete">删除</a>\n' +
    '            </td>\n' +
    '        </tr>\n';

function ColumnGetListHandler() {
    APIColumnGetList(ColumnListPageEnv, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            // TODO: column列表获取支持分页, 低优先级, 因为目前column为菜单栏, 有数量限制
            ColumnListPageEnv.is_end = true;
            if (!data["list"] || data["list"].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
                return
            }
            $.each(data['list'], function (index, item) {
                var navbarItem = $(ColumnListItemTemplate);
                navbarItem.attr("id", "ColoumnListItem" + item.id);
                navbarItem.find(".ColumnListItemID").text(item.id);
                navbarItem.find(".ColumnListItemName").text(item.name);
                navbarItem.find(".ColumnListItemAuthor").text(item.nickname);
                navbarItem.find(".ColumnListItemTime").text(CtsTimeFormat(item.created_at));
                navbarItem.find(".ColumnListItemUpdate").attr("alt", item.id);
                navbarItem.find(".ColumnListItemDelete").attr("alt", item.id);
                $(".ListItemsContainer").append(navbarItem)
            });
            gotoPageBottom();
            $(".ColumnListItemUpdate").click(ColumnUpdateHandler);
            $(".ColumnListItemDelete").click(ColumnDeleteHandler);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function ColumnGetMoreHandler() {
    if (!ColumnListPageEnv.is_end) {
        ColumnGetListHandler();
    } else {
        AlertShowAutoClose("请知晓", "亲,无更多数据");
    }
}

function ColumnListPageGetCurrentEnv(currentUrl) {
    ColumnListPageEnv.type_id = GetURIParamInt(currentUrl, "type_id") || typeIdDefault;
    ColumnListPageEnv.order_by = GetURIParamStr(currentUrl, "order_by") || orderByDefault;
    ColumnListPageEnv.page_size = GetURIParamInt(currentUrl, "page_size") || PageSizeDefault;
    ColumnListPageEnv.page_num = GetURIParamInt(currentUrl, "page_num") || PageStartNumberDefault;
}

var ColumnListPageEnv = {
    type_id: typeIdDefault,
    creater_uid: getCreaterUid(),
    column_id: columnIdDefault,
    article_id: articleIdDefault,
    order_by: orderByDefault,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

function ColumnListRender(currentUrl) {
    $(".ContentContainer").append(ColumnListTemplate);
    ColumnListPageGetCurrentEnv(currentUrl);
    if (ColumnListPageEnv.order_by === orderByCommentCount) {
        $(".ColumnListTitle").text("热度排序");
    } else {
        $(".ColumnListTitle").text("时间排序");
    }
    ColumnGetListHandler();
    $(".ColumnGetMoreHandler").click(ColumnGetMoreHandler);
}