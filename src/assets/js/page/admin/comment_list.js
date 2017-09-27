function CommentListPageRender() {
    NavbarRender();
    FootbarRender();
    CommentListRender(location.href);
}

// 修改评论
function CommentUpdateHandler(pe) {
    // 设置为当前评论的内容
    var oldCommentContent = $("#CommentListItemName" + $(this).attr("alt")).text();
    $(".CommentCurrentCount").text(oldCommentContent.length);
    $(".CommentContentField").val(oldCommentContent);

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