
function ArticlePageRender() {
    NavbarRender();
    AriticleDetailRender(location.href);
    FootbarRender();
    var articleId = GetURIParamStr(location.href, "article_id");
    CommentRender(location.href + "&relate_id=" + articleId);
}

$(document).ready(function () {
    ArticlePageRender();
});