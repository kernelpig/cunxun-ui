var CarpoolingListTemplate = '<table class="am-table am-table-compact am-text-sm am-text-primary">\n' +
    '        <thead>\n' +
    '        <tr>\n' +
    '            <th>出发</th>\n' +
    '            <th>到达</th>\n' +
    '            <th>日期</th>\n' +
    '            <th class="am-show-lg-up">人数</th>\n' +
    '            <th class="am-show-lg-up">联系人</th>\n' +
    '            <th class="am-show-lg-up">备注</th>\n' +
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
    '            <td><a class="CarpoolingListItemFromCity"></a></td>\n' +
    '            <td><a class="CarpoolingListItemToCity"></a></td>\n' +
    '            <td><a class="CarpoolingListItemDepartTime"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="CarpoolingListItemPeopleCount"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="CarpoolingListItemContact"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="CarpoolingListItemRemark"></a></td>\n' +
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
                navbarItem.find(".CarpoolingListItemFromCity").text(item.from_city);
                navbarItem.find(".CarpoolingListItemFromCity").attr("href", carpoolingUrl);
                navbarItem.find(".CarpoolingListItemToCity").text(item.to_city);
                navbarItem.find(".CarpoolingListItemToCity").attr("href", carpoolingUrl);
                navbarItem.find(".CarpoolingListItemDepartTime").text(CtsTimeFormat(item.depart_time));
                navbarItem.find(".CarpoolingListItemDepartTime").attr("href", carpoolingUrl);
                navbarItem.find(".CarpoolingListItemPeopleCount").text(item.people_count);
                navbarItem.find(".CarpoolingListItemContact").text(item.contact);
                navbarItem.find(".CarpoolingListItemCreatedAt").text(CtsTimeFormat(item.created_at));
                navbarItem.find(".CarpoolingListItemRemark").html(parseSpecialChar(item.remark));
                $(".ListItemsContainer").append(navbarItem);
            });
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
    creater_uid: createrUidDefault,
    carpooling_id: carpoolingIdDefault,
    order_by: orderByDefault,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

function CarpoolingListRender(currentUrl) {
    $(".ContentContainer").append(CarpoolingListTemplate);
    CarpoolingListPageGetCurrentEnv(currentUrl);
    if (CarpoolingListPageEnv.order_by === orderByCreateDate) {
        $(".CarpoolingListTitle").text("时间排序");
    }
    CarpoolingGetListHandler();
    $(".CarpoolingGetMoreHandler").click(CarpoolingGetMoreHandler);
}