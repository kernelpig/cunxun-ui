
function ListPageRender() {
    NavbarRender();
    FootbarRender();
    ArticleListRender(location.href);
}

$(document).ready(function () {
    ListPageRender();
});