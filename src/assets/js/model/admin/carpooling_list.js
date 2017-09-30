var CarpoolingListTemplate = '<table class="am-table am-table-striped am-table-compact am-text-sm am-text-primary">\n' +
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
    '        <a class="am-list-news-more am-btn am-btn-default CarpoolingGetMoreHandler" href="###">查看更多 &raquo;</a>\n' +
    '    </div>';

var CarpoolingListItemTemplate = '<tr>\n' +
    '            <td class="am-show-lg-up"><a class="CarpoolingListItemID"></a></td>\n' +
    '            <td><a class="CarpoolingListItemName"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="CarpoolingListItemAuthor"></a></td>\n' +
    '            <td class="CarpoolingListItemTime am-show-lg-up"></td>\n' +
    '            <td>\n' +
    '                <a class="am-btn am-btn-xs am-btn-default am-icon-pencil CarpoolingListItemUpdate">修改</a>\n' +
    '                <a class="am-btn am-btn-xs am-btn-primary am-icon-trash CarpoolingListItemDelete">删除</a>\n' +
    '            </td>\n' +
    '        </tr>\n';

function CarpoolingGetListHandler() {
    APICarpoolingGetList(CarpoolingListPageEnv, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            CarpoolingListPageEnv.is_end = data['end'];
            if (!data["list"] || data["list"].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
                return
            }
            CarpoolingListPageEnv.page_num += 1;
            $.each(data['list'], function (index, item) {
                var navbarItem = $(CarpoolingListItemTemplate);
                var articleUrl = "../article.html?article_id=" + item.id;
                navbarItem.find(".CarpoolingListItemID").text(item.id);
                navbarItem.find(".CarpoolingListItemID").attr("href", articleUrl);
                navbarItem.find(".CarpoolingListItemName").text(item.title);
                navbarItem.find(".CarpoolingListItemName").attr("href", articleUrl);
                navbarItem.find(".CarpoolingListItemAuthor").text(item.nickname);
                navbarItem.find(".CarpoolingListItemTime").text(GMT2Beijing(item.created_at));
                var updateUrl = "article.html?action=update&article_id=" + item.id;
                navbarItem.find(".CarpoolingListItemUpdate").attr("href", updateUrl);
                navbarItem.find(".CarpoolingListItemDelete").attr("alt", item.id);
                $(".ListItemsContainer").append(navbarItem);
            });
            $(".CarpoolingListItemDelete").click(CarpoolingDeleteHandler);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function CarpoolingGetMoreHandler() {
    if (!CarpoolingListPageEnv.is_end) {
        CarpoolingGetListHandler();
    } else {
        AlertShowAutoClose("请知晓", "亲,无更多数据");
    }
}

function CarpoolingListPageGetCurrentEnv(currentUrl) {
    CarpoolingListPageEnv.type_id = GetURIParamInt(currentUrl, "type_id") || typeIdDefault;
    CarpoolingListPageEnv.order_by = GetURIParamStr(currentUrl, "order_by") || orderByDefault;
    CarpoolingListPageEnv.page_size = GetURIParamInt(currentUrl, "page_size") || PageSizeDefault;
    CarpoolingListPageEnv.page_num = GetURIParamInt(currentUrl, "page_num") || PageStartNumberDefault;
}

var CarpoolingListPageEnv = {
    type_id: typeIdDefault,
    creater_uid: getCreaterUid(),
    column_id: columnIdDefault,
    article_id: articleIdDefault,
    order_by: orderByDefault,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

function CarpoolingListRender(currentUrl) {
    $(".ContentContainer").append(CarpoolingListTemplate);
    CarpoolingListPageGetCurrentEnv(currentUrl);
    if (CarpoolingListPageEnv.order_by === orderByCommentCount) {
        $(".CarpoolingListTitle").text("热度排序");
    } else {
        $(".CarpoolingListTitle").text("时间排序");
    }
    CarpoolingGetListHandler();
    $(".CarpoolingGetMoreHandler").click(CarpoolingGetMoreHandler);
}