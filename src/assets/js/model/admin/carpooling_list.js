var CarpoolingListTemplate = '<table class="am-table am-table-striped am-table-compact am-text-sm am-text-primary">\n' +
    '        <thead>\n' +
    '        <tr>\n' +
    '            <th class="am-show-lg-up">ID</th>\n' +
    '            <th>出发</th>\n' +
    '            <th>到达</th>\n' +
    '            <th>日期</th>\n' +
    '            <th class="am-show-lg-up">人数</th>\n' +
    '            <th class="am-show-lg-up">联系人</th>\n' +
    '            <th class="am-show-lg-up">备注</th>\n' +
    '            <th class="am-show-lg-up">创建时间</th>\n' +
    '            <th class="am-show-lg-up">创建者</th>\n' +
    '            <th>操作</th>\n' +
    '        </tr>\n' +
    '        </thead>\n' +
    '        <tbody class="ListItemsContainer">\n' +
    '        </tbody>\n' +
    '    </table>\n' +
    '    <!--更多在底部-->\n' +
    '    <div class="am-list-news-ft">\n' +
    '        <a class="am-list-news-more am-btn am-btn-primary am-btn-sm CarpoolingGetMoreHandler" href="#">查看更多 &raquo;</a>\n' +
    '    </div>';

var CarpoolingListItemTemplate = '<tr>\n' +
    '            <td class="am-show-lg-up"><a class="CarpoolingListItemID"></a></td>\n' +
    '            <td><a class="CarpoolingListItemFromCity"></a></td>\n' +
    '            <td><a class="CarpoolingListItemToCity"></a></td>\n' +
    '            <td><a class="CarpoolingListItemDepartTime"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="CarpoolingListItemPeopleCount"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="CarpoolingListItemContact"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="CarpoolingListItemRemark"></a></td>\n' +
    '            <td class="am-show-lg-up CarpoolingListItemCreatedAt"></td>\n' +
    '            <td class="am-show-lg-up CarpoolingListItemCreater"></td>\n' +
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
                return
            }
            CarpoolingListPageEnv.page_num += 1;
            $.each(data['list'], function (index, item) {
                var navbarItem = $(CarpoolingListItemTemplate);
                var carpoolingUrl = "../carpooling.html?carpooling_id=" + item.id;
                navbarItem.find(".CarpoolingListItemID").text(item.id);
                navbarItem.find(".CarpoolingListItemID").attr("href", carpoolingUrl);
                navbarItem.find(".CarpoolingListItemFromCity").text(item.from_city);
                navbarItem.find(".CarpoolingListItemFromCity").attr("href", carpoolingUrl);
                navbarItem.find(".CarpoolingListItemToCity").text(item.to_city);
                navbarItem.find(".CarpoolingListItemToCity").attr("href", carpoolingUrl);
                navbarItem.find(".CarpoolingListItemDepartTime").text(CtsTimeFormat(item.depart_time));
                navbarItem.find(".CarpoolingListItemDepartTime").attr("href", carpoolingUrl);
                navbarItem.find(".CarpoolingListItemPeopleCount").text(item.people_count);
                navbarItem.find(".CarpoolingListItemContact").text(item.contact);
                navbarItem.find(".CarpoolingListItemCreatedAt").text(CtsTimeFormat(item.created_at));
                navbarItem.find(".CarpoolingListItemCreater").text(item.nickname);
                navbarItem.find(".CarpoolingListItemRemark").html(parseSpecialChar(item.remark));
                var updateUrl = "carpooling.html?action=update&carpooling_id=" + item.id;
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
    carpooling_id: carpoolingIdDefault,
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