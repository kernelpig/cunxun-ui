
function ListPageRender() {
    NavbarRender();
    FootbarRender();
    TypeListRender(location.href);
}

$(document).ready(function () {
    ListPageRender();
});