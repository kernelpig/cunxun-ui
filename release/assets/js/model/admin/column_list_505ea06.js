function ColumnGetListHandler(){APIColumnGetList(ColumnListPageEnv,AlertShowAjaxError,function(t){if(0===t.code){if(ColumnListPageEnv.is_end=!0,!t.list||0===t.list.length)return void AlertShowAutoClose("请知晓","亲,无更多数据");$.each(t.list,function(t,e){var n=$(ColumnListItemTemplate);n.attr("id","ColoumnListItem"+e.id),n.find(".ColumnListItemID").text(e.id),n.find(".ColumnListItemName").text(e.name),n.find(".ColumnListItemAuthor").text(e.nickname),n.find(".ColumnListItemTime").text(CtsTimeFormat(e.created_at)),n.find(".ColumnListItemUpdate").attr("alt",e.id),n.find(".ColumnListItemDelete").attr("alt",e.id),$(".ListItemsContainer").append(n)}),gotoPageBottom(),$(".ColumnListItemUpdate").click(ColumnUpdateHandler),$(".ColumnListItemDelete").click(ColumnDeleteHandler)}else AlertShowError(t.sub_error)})}function ColumnGetMoreHandler(){ColumnListPageEnv.is_end?AlertShowAutoClose("请知晓","亲,无更多数据"):ColumnGetListHandler()}function ColumnListPageGetCurrentEnv(t){ColumnListPageEnv.type_id=GetURIParamInt(t,"type_id")||typeIdDefault,ColumnListPageEnv.order_by=GetURIParamStr(t,"order_by")||orderByDefault,ColumnListPageEnv.page_size=GetURIParamInt(t,"page_size")||PageSizeDefault,ColumnListPageEnv.page_num=GetURIParamInt(t,"page_num")||PageStartNumberDefault}function ColumnListRender(t){$(".ContentContainer").append(ColumnListTemplate),ColumnListPageGetCurrentEnv(t),$(".ColumnListTitle").text(ColumnListPageEnv.order_by===orderByCommentCount?"热度排序":"时间排序"),ColumnGetListHandler(),$(".ColumnGetMoreHandler").click(ColumnGetMoreHandler)}var ColumnListTemplate='<table class="am-table am-table-striped am-table-compact am-text-sm am-text-primary">\n        <thead>\n        <tr>\n            <th class="am-show-lg-up">ID</th>\n            <th>栏目名称</th>\n            <th class="am-show-lg-up">作者</th>\n            <th class="am-show-lg-up">时间</th>\n            <th>操作</th>\n        </tr>\n        </thead>\n        <tbody class="ListItemsContainer">\n        </tbody>\n    </table>\n    <!--更多在底部-->\n    <div class="am-list-news-ft">\n        <a class="am-list-news-more am-btn am-btn-primary am-btn-sm ColumnGetMoreHandler" href="#">查看更多 &raquo;</a>\n    </div>',ColumnListItemTemplate='<tr>\n            <td class="am-show-lg-up"><a class="ColumnListItemID"></a></td>\n            <td><a class="ColumnListItemName"></a></td>\n            <td class="am-show-lg-up"><a class="ColumnListItemAuthor"></a></td>\n            <td class="ColumnListItemTime am-show-lg-up"></td>\n            <td>\n                <a class="am-btn am-btn-xs am-btn-default am-icon-pencil ColumnListItemUpdate">修改</a>\n                <a class="am-btn am-btn-xs am-btn-primary am-icon-trash ColumnListItemDelete">删除</a>\n            </td>\n        </tr>\n',ColumnListPageEnv={type_id:typeIdDefault,creater_uid:getCreaterUid(),column_id:columnIdDefault,article_id:articleIdDefault,order_by:orderByDefault,page_size:PageSizeDefault,page_num:PageStartNumberDefault,is_end:!1};