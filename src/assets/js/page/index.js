function IndexPageRender(parseUrl) {
    NavbarRender();
    FootbarRender();
    ArticleListRender(parseUrl);
}

$(document).ready(function () {
    // TODO: 热贴需要支持时间范围过滤
   IndexPageRender("?column_id=0&order_by=comment_count");
});