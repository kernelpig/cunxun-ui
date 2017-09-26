var CommentListTemplate = '<table class="am-table am-table-striped am-table-compact am-text-sm am-text-primary">\n' +
    '        <thead>\n' +
    '        <tr>\n' +
    '            <th class="am-show-lg-up">ID</th>\n' +
    '            <th>内容</th>\n' +
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
    '        <a class="am-list-news-more am-btn am-btn-default CommentGetMoreHandler" href="###">查看更多 &raquo;</a>\n' +
    '    </div>';

var CommentListItemTemplate = '<tr>\n' +
    '            <td class="am-show-lg-up"><a class="CommentListItemID"></a></td>\n' +
    '            <td><a class="CommentListItemName"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="CommentListItemAuthor"></a></td>\n' +
    '            <td class="CommentListItemTime am-show-lg-up"></td>\n' +
    '            <td>\n' +
    '                <a class="am-btn am-btn-xs am-btn-default am-icon-pencil CommentListItemUpdate">修改</a>\n' +
    '                <a class="am-btn am-btn-xs am-btn-primary am-icon-trash CommentListItemDelete">删除</a>\n' +
    '            </td>\n' +
    '        </tr>\n';

function CommentGetListHandler() {
    APICommentGetList(CommentListPageEnv, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            CommentListPageEnv.is_end = data['end'];
            if (!data["list"] || data["list"].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
                return
            }
            CommentListPageEnv.page_num += 1;
            $.each(data['list'], function (index, item) {
                var navbarItem = $(CommentListItemTemplate);
                var articleUrl = "../article.html?article_id=" + item.article_id;
                navbarItem.find(".CommentListItemID").text(item.id);
                navbarItem.find(".CommentListItemID").attr("href", articleUrl);
                navbarItem.find(".CommentListItemName").text(item.content);
                navbarItem.find(".CommentListItemName").attr("href", articleUrl);
                navbarItem.find(".CommentListItemName").attr("id", "CommentListItemName"+item.id);
                navbarItem.find(".CommentListItemAuthor").text(item.nickname);
                navbarItem.find(".CommentListItemTime").text(GMT2Beijing(item.created_at));
                navbarItem.find(".CommentListItemUpdate").attr("alt", item.id);
                navbarItem.find(".CommentListItemDelete").attr("alt", item.id);
                $(".ListItemsContainer").append(navbarItem)
            });
            $(".CommentListItemUpdate").click(CommentUpdateHandler);
            $(".CommentListItemDelete").click(CommentDeleteHandler);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function CommentGetMoreHandler() {
    if (!CommentListPageEnv.is_end) {
        CommentGetListHandler();
    } else {
        AlertShowAutoClose("请知晓", "亲,无更多数据");
    }
}

function CommentListPageGetCurrentEnv(currentUrl) {
    CommentListPageEnv.type_id = GetURIParamInt(currentUrl, "type_id") || typeIdDefault;
    CommentListPageEnv.order_by = GetURIParamStr(currentUrl, "order_by") || orderByDefault;
    CommentListPageEnv.page_size = GetURIParamInt(currentUrl, "page_size") || PageSizeDefault;
    CommentListPageEnv.page_num = GetURIParamInt(currentUrl, "page_num") || PageStartNumberDefault;
}

// 普通用户只获取自己创建的, 管理员及以上用户则获取所有的
function getCreaterUid() {
    if (!Cookies.get("UserRole") || Cookies.get("UserRole") === 0) {
        return Cookies.get("UserId");
    }
    return createrUidDefault;
}

var CommentListPageEnv = {
    type_id: typeIdDefault,
    creater_uid: getCreaterUid(),
    column_id: columnIdDefault,
    article_id: articleIdDefault,
    order_by: orderByDefault,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

function CommentListRender(currentUrl) {
    $(".ContentContainer").append(CommentListTemplate);
    CommentListPageGetCurrentEnv(currentUrl);
    if (CommentListPageEnv.order_by === orderByCommentCount) {
        $(".CommentListTitle").text("热度排序");
    } else {
        $(".CommentListTitle").text("时间排序");
    }
    CommentGetListHandler();
    $(".CommentGetMoreHandler").click(CommentGetMoreHandler);
}