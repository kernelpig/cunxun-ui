var CommentListPageEnv = {
    article_id: articleIdDefault,
    order_by: orderByDefault,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

function NavbarItemCommentGetList() {
    APICommentGetList(CommentListPageEnv, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            if (!data["list"] || data["list"].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
                return
            }
            $.each(data['list'], function (index, item) {
                var navbarItem = $(TypeListItemTemplate);
                navbarItem.find(".TypeListItemID").text(item.id);
                navbarItem.find(".TypeListItemName").text(item.content);
                navbarItem.find(".TypeListItemAuthor").text(item.nickname);
                navbarItem.find(".TypeListItemTime").text(GMT2Beijing(item.created_at));
                navbarItem.find(".TypeListItemUpdate").attr("alt", item.id);
                navbarItem.find(".TypeListItemDelete").attr("alt", item.id);
                $(".ListItemsContainer").append(navbarItem)
            });
            $(".TypeListItemUpdate").click(CommentUpdateHandler);
            $(".TypeListItemDelete").click(CommentDeleteHandler);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function CommentListPageRender() {
    NavbarRender();
    FootbarRender();
    TypeListRender(location.href);
}

// 修改评论
function CommentUpdateHandler(pe) {
    $(".CommentItemUpdateDialog").modal({
        relatedTarget: pe.target,
        onConfirm: function(e) {
            var columnId = $(this.relatedTarget).attr("alt");
            APICommentUpdateById(columnId, {content: e.data}, AlertShowAjaxError, function (data) {
                if (data["code"] === 0) {
                    location.reload();
                } else {
                    AlertShowError(data["sub_error"]);
                }
            });
        },
        onCancel: function(e) {  }
    });
}

// 删除评论
function CommentDeleteHandler(pe) {
    $(".CommentItemDeleteDialog").modal({
        relatedTarget: pe.target,
        onConfirm: function(e) {
            var columnId = $(this.relatedTarget).attr("alt");
            APICommentDeleteById(columnId, AlertShowAjaxError, function (data) {
                if (data["code"] === 0) {
                    location.reload();
                } else {
                    AlertShowError(data["sub_error"]);
                }
            });
        },
        onCancel: function(e) {  }
    });
}

$(document).ready(function () {
    CommentListPageRender();
});