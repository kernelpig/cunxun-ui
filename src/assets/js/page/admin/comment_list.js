
function NavbarItemCommentGetList(pageEnv) {
    APICommentGetList(pageEnv, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            pageEnv.is_end = data['end'];
            if (!data["list"] || data["list"].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
                return
            }
            pageEnv.page_num += 1;
            $.each(data['list'], function (index, item) {
                var navbarItem = $(TypeListItemTemplate);
                var articleUrl = "../article.html?article_id=" + item.article_id;
                navbarItem.find(".TypeListItemID").text(item.id);
                navbarItem.find(".TypeListItemID").attr("href", articleUrl);
                navbarItem.find(".TypeListItemName").text(item.content);
                navbarItem.find(".TypeListItemName").attr("href", articleUrl);
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
            if (e.data.length > CommentLengthDefault) {
                AlertShowAutoClose("评论超长", "评论超长, 只允许" + CommentLengthDefault + "字符!");
                return
            }
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

function CommentChangeHandler() {
    var commentLen = $(".CommentContentField").val().length;
    $(".CommentCurrentCount").text(commentLen);
    if (commentLen > CommentLengthDefault) {
        AlertShowAutoClose("评论超长", "评论超长, 只允许" + CommentLengthDefault + "字符!");
    }
}

$(document).ready(function () {
    CommentListPageRender();
    $(".CommentMaxCount").text(CommentLengthDefault);
    $(".CommentContentField").bind("input propertychange", "textarea", CommentChangeHandler);
});