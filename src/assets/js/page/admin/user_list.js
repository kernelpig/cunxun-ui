function UserListPageRender() {
    NavbarRender();
    FootbarRender();
    UserListRender(location.href);
}

$(document).ready(function () {
    UserListPageRender();
    $(".UserCreateHandler").click(UserCreateHandler);
});