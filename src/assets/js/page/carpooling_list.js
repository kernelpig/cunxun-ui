function CarpoolingListPageRender() {
    NavbarRender();
    FootbarRender();
    CarpoolingListRender(location.href);
}

$(document).ready(function () {
    CarpoolingListPageRender();
});