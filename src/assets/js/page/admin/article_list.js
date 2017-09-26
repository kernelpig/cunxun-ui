
// 删除文章
function ArticleDeleteHandler(pe) {
    $(".ArticleItemDeleteDialog").modal({
        relatedTarget: pe.target,
        onConfirm: function(e) {
            var articleId = $(this.relatedTarget).attr("alt");
            APIArticleDeleteById(articleId, AlertShowAjaxError, function (data) {
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

function ArticleListPageRender() {
    NavbarRender();
    FootbarRender();
    ArticleListRender(location.href);
}

$(document).ready(function () {
    ArticleListPageRender();
});