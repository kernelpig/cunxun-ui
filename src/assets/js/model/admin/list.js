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
    '    </table>';

var TypeListItemTemplate = '<tr>\n' +
    '            <td class="am-show-lg-up"><a class="TypeListItemID"></a></td>\n' +
    '            <td><a class="TypeListItemName"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="TypeListItemAuthor"></a></td>\n' +
    '            <td class="TypeListItemTime am-show-lg-up"></td>\n' +
    '            <td>\n' +
    '                <button class="am-btn am-btn-xs am-btn-default am-icon-pencil">修改</button>\n' +
    '                <button class="am-btn am-btn-xs am-btn-primary am-icon-trash">删除</button>\n' +
    '            </td>\n' +
    '        </tr>\n';

function NavbarItemColumnGetList() {
    APIColumnGetList(AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            if (!data["list"] || data["list"].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
                return
            }
            $.each(data['list'], function (index, item) {
                var navbarItem = $(TypeListItemTemplate);
                navbarItem.find(".TypeListItemID").text(item.id);
                navbarItem.find(".TypeListItemName").text(item.name);
                navbarItem.find(".TypeListItemAuthor").text(item.nickname);
                navbarItem.find(".TypeListItemTime").text(GMT2Beijing(item.created_at));
                $(".ListItemsContainer").append(navbarItem)
            })
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function TypeGetListHandler() {
    if (TypeListPageEnv.type_id === typeIdColumn) {
        NavbarItemColumnGetList();
    } else if (TypeListPageEnv.type_id === typeIdArticle) {
        NavbarItemArticleGetList();
    } else if (TypeListPageEnv.type_id === typeIdComment) {
        NavbarItemCommentGetList();
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
    $('#TypeGetMoreHandler').click(TypeGetMoreHandler);
}