function CarpoolingGetListHandler(){APICarpoolingGetList(CarpoolingListPageEnv,AlertShowAjaxError,function(t){if(0===t.code){if(CarpoolingListPageEnv.is_end=t.end,!t.list||0===t.list.length)return;CarpoolingListPageEnv.page_num+=1,$.each(t.list,function(t,a){var e=$(CarpoolingListItemTemplate),i="../carpooling.html?carpooling_id="+a.id;e.find(".CarpoolingListItemFromCity").text(a.from_city),e.find(".CarpoolingListItemFromCity").attr("href",i),e.find(".CarpoolingListItemToCity").text(a.to_city),e.find(".CarpoolingListItemToCity").attr("href",i),e.find(".CarpoolingListItemDepartTime").text(CtsTimeFormat(a.depart_time)),e.find(".CarpoolingListItemDepartTime").attr("href",i),e.find(".CarpoolingListItemPeopleCount").text(a.people_count),e.find(".CarpoolingListItemContact").text(a.contact),e.find(".CarpoolingListItemCreatedAt").text(CtsTimeFormat(a.created_at)),e.find(".CarpoolingListItemRemark").text($(a.remark).text()),$(".ListItemsContainer").append(e)}),gotoPageBottom()}else AlertShowError(t.sub_error)})}function CarpoolingGetMoreHandler(){CarpoolingListPageEnv.is_end?AlertShowAutoClose("请知晓","亲,无更多数据"):CarpoolingGetListHandler()}function CarpoolingListPageGetCurrentEnv(t){CarpoolingListPageEnv.type_id=GetURIParamInt(t,"type_id")||typeIdDefault,CarpoolingListPageEnv.order_by=GetURIParamStr(t,"order_by")||orderByDefault,CarpoolingListPageEnv.page_size=GetURIParamInt(t,"page_size")||PageSizeDefault,CarpoolingListPageEnv.page_num=GetURIParamInt(t,"page_num")||PageStartNumberDefault}function CarpoolingListRender(t){$(".ContentContainer").append(CarpoolingListTemplate),CarpoolingListPageGetCurrentEnv(t),CarpoolingListPageEnv.order_by===orderByCreateDate&&$(".CarpoolingListTitle").text("时间排序"),CarpoolingGetListHandler(),$(".CarpoolingGetMoreHandler").click(CarpoolingGetMoreHandler)}var CarpoolingListTemplate='<div data-am-widget="list_news" class="am-list-news am-list-news-default" >\n    <!--列表标题-->\n    <div class="am-list-news-hd am-cf">\n            <!--带更多链接-->\n                <button class="am-btn am-btn-sm am-btn-primary ArticleListTitle ArticleListOrderByCreateDate">最新</button>\n        </div>\n    <div class="am-list-news-bd">\n            <ul class="am-list ListItemsContainer">\n                <li class="am-g">\n                    <a class="am-list-item-hd am-text-truncate am-u-sm-4 am-u-md-2 am-padding-left-sm">出发城市</a>\n                    <a class="am-list-item-hd am-text-truncate am-u-sm-4 am-u-md-2 am-padding-left-sm">到达城市</a>\n                    <a class="am-list-item-hd am-text-truncate am-u-sm-4 am-u-md-2">发车时间</a>\n                    <a class="am-list-item-hd am-u-md-1 am-show-lg-up">可载</a>\n                    <a class="am-list-item-hd am-u-md-2 am-show-lg-up">联系方式</a>\n                    <a class="am-list-item-hd am-text-truncate am-u-md-3 am-show-lg-up">更多信息\n                    </a>\n                </li>\n                </ul>\n        </div>\n    <!--更多在底部-->\n    <div class="am-list-news-ft">\n            <button class="am-list-news-more am-btn am-btn-primary am-btn-sm CarpoolingGetMoreHandler">查看更多 &raquo;</button>\n        </div>\n    </div>',CarpoolingListItemTemplate='<li class="am-g">\n                    <a class="am-list-item-text am-text-truncate am-u-sm-4 am-u-md-2 am-padding-left-sm CarpoolingListItemFromCity">曹州定陶区</a>\n                    <a class="am-list-item-text am-text-truncate am-u-sm-4 am-u-md-2 am-padding-left-sm CarpoolingListItemToCity">北京丰台区</a>\n                    <a class="am-list-item-text am-text-truncate am-u-sm-4 am-u-md-2 CarpoolingListItemDepartTime">2017-10-13 10:10:37</a>\n                    <a class="am-list-item-text am-u-md-1 am-show-lg-up CarpoolingListItemPeopleCount">2</a>\n                    <a class="am-list-item-text am-u-md-2 am-show-lg-up CarpoolingListItemContact">姜永-13439962686</a>\n                    <a class="am-list-item-text am-text-truncate am-u-md-3 am-show-lg-up CarpoolingListItemRemark">\n                            发车时间: 2017.10.13~2017.10.15 ddsfldsfsjsldjflskjj\n                            可载人数: 与车主联系确\n                    </a>\n                </li>\n',CarpoolingListPageEnv={type_id:typeIdDefault,creater_uid:createrUidDefault,carpooling_id:carpoolingIdDefault,order_by:orderByDefault,page_size:PageSizeDefault,page_num:PageStartNumberDefault,is_end:!1};