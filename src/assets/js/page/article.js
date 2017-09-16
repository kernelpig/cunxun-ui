
function ArticlePageRender() {
    NavbarRender();
    AriticleDetailRender(location.href);
    FootbarRender();
    CommentRender(location.href);
}

$(document).ready(function () {
    ArticlePageRender();
});