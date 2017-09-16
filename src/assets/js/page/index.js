function IndexPageRender(parseUrl) {
    NavbarRender();
    FootbarRender();
    ArticleListRender(parseUrl);
}

$(document).ready(function () {
   IndexPageRender("?column_id=2");
});