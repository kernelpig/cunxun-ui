function CommentListPageRender(){NavbarRender(),FootbarRender(),CommentListRender(location.href)}function CommentUpdateHandler(t){var e=$("#CommentListItemName"+$(this).attr("alt")).text();$(".CommentCurrentCount").text(e.length),$(".CommentContentField").val(e),$(".CommentItemUpdateDialog").modal({relatedTarget:t.target,onConfirm:function(t){if(t.data.length>CommentLengthDefault)return void AlertShowAutoClose("评论超长","评论超长, 只允许"+CommentLengthDefault+"字符!");var e=$(this.relatedTarget).attr("alt");APICommentUpdateById(e,{content:t.data},AlertShowAjaxError,function(t){0===t.code?location.reload():AlertShowError(t.sub_error)})},onCancel:function(){}})}function CommentDeleteHandler(t){$(".CommentItemDeleteDialog").modal({relatedTarget:t.target,onConfirm:function(){var t=$(this.relatedTarget).attr("alt");APICommentDeleteById(t,AlertShowAjaxError,function(t){0===t.code?location.reload():AlertShowError(t.sub_error)})},onCancel:function(){}})}function CommentChangeHandler(){var t=$(".CommentContentField").val().length;$(".CommentCurrentCount").text(t),t>CommentLengthDefault&&AlertShowAutoClose("评论超长","评论超长, 只允许"+CommentLengthDefault+"字符!")}$(document).ready(function(){CommentListPageRender(),$(".CommentMaxCount").text(CommentLengthDefault),$(".CommentContentField").bind("input propertychange","textarea",CommentChangeHandler)});