var ArticleListPageEnv = {
    column_id: columnIdDefault,
    order_by: orderByDefault,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};


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

function NavbarItemArticleGetList() {
    APIArticleGetList(ArticleListPageEnv, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            if (!data["list"] || data["list"].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
                return
            }
            $.each(data['list'], function (index, item) {
                var navbarItem = $(TypeListItemTemplate);
                var articleUrl = "../article.html?article_id=" + item.id;
                navbarItem.find(".TypeListItemID").text(item.id);
                navbarItem.find(".TypeListItemID").attr("href", articleUrl);
                navbarItem.find(".TypeListItemName").text(item.title);
                navbarItem.find(".TypeListItemName").attr("href", articleUrl);
                navbarItem.find(".TypeListItemAuthor").text(item.nickname);
                navbarItem.find(".TypeListItemTime").text(GMT2Beijing(item.created_at));
                var updateUrl = "article.html?action=update&article_id=" + item.id;
                navbarItem.find(".TypeListItemUpdate").attr("href", updateUrl);
                navbarItem.find(".TypeListItemDelete").attr("alt", item.id);
                $(".ListItemsContainer").append(navbarItem);
            });
            $(".TypeListItemDelete").click(ArticleDeleteHandler);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function ArticleListPageRender() {
    NavbarRender();
    FootbarRender();
    TypeListRender(location.href);
}

$(document).ready(function () {
    ArticleListPageRender();
});