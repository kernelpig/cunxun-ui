var CarpoolingListTemplate = '<div data-am-widget="list_news" class="am-list-news am-list-news-default" >\n' +
    '    <!--列表标题-->\n' +
    '    <div class="am-list-news-hd am-cf">\n' +
    '            <!--带更多链接-->\n' +
    '                <button class="am-btn am-btn-sm am-btn-primary ArticleListTitle ArticleListOrderByCreateDate">最新</button>\n' +
    '        </div>\n' +
    '    <div class="am-list-news-bd">\n' +
    '            <ul class="am-list ListItemsContainer">\n' +
    '                <li class="am-g">\n' +
    '                    <a class="am-list-item-hd am-text-truncate am-u-sm-4 am-u-md-2 am-padding-left-sm">出发城市</a>\n' +
    '                    <a class="am-list-item-hd am-text-truncate am-u-sm-4 am-u-md-2 am-padding-left-sm">到达城市</a>\n' +
    '                    <a class="am-list-item-hd am-text-truncate am-u-sm-4 am-u-md-2">发车时间</a>\n' +
    '                    <a class="am-list-item-hd am-u-md-1 am-show-lg-up">可载</a>\n' +
    '                    <a class="am-list-item-hd am-u-md-2 am-show-lg-up">联系方式</a>\n' +
    '                    <a class="am-list-item-hd am-text-truncate am-u-md-3 am-show-lg-up">更多信息\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                </ul>\n' +
    '        </div>\n' +
    '    <!--更多在底部-->\n' +
    '    <div class="am-list-news-ft">\n' +
    '            <a class="am-list-news-more am-btn am-btn-default CarpoolingGetMoreHandler" href="#">查看更多 &raquo;</a>\n' +
    '        </div>\n' +
    '    </div>';

var CarpoolingListItemTemplate = '<li class="am-g">\n' +
    '                    <a class="am-list-item-text am-text-truncate am-u-sm-4 am-u-md-2 am-padding-left-sm CarpoolingListItemFromCity">曹州定陶区</a>\n' +
    '                    <a class="am-list-item-text am-text-truncate am-u-sm-4 am-u-md-2 am-padding-left-sm CarpoolingListItemToCity">北京丰台区</a>\n' +
    '                    <a class="am-list-item-text am-text-truncate am-u-sm-4 am-u-md-2 CarpoolingListItemDepartTime">2017-10-13 10:10:37</a>\n' +
    '                    <a class="am-list-item-text am-u-md-1 am-show-lg-up CarpoolingListItemPeopleCount">2</a>\n' +
    '                    <a class="am-list-item-text am-u-md-2 am-show-lg-up CarpoolingListItemContact">姜永-13439962686</a>\n' +
    '                    <a class="am-list-item-text am-text-truncate am-u-md-3 am-show-lg-up CarpoolingListItemRemark">\n' +
    '                            发车时间: 2017.10.13~2017.10.15 ddsfldsfsjsldjflskjj\n' +
    '                            可载人数: 与车主联系确\n' +
    '                    </a>\n' +
    '                </li>\n';

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
                navbarItem.find(".CarpoolingListItemRemark").text($(item.remark).text());
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