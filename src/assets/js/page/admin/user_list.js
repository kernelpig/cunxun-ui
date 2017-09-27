function UserListPageRender() {
    NavbarRender();
    FootbarRender();
    UserListRender(location.href);
}

function UserCreateHandler() {
    $(".UserItemUpdateDialog").modal({
        relatedTarget: this,
        onConfirm: function(e) {
            alert(e.data);
            var req = {
                phone: "86 " + e.data[0],
                password: e.data[1],
                nickname: e.data[2],
                role: parseInt(e.data[3]) || 0
            };
            APIUserCreate(req, AlertShowAjaxError, function (data) {
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

$(document).ready(function () {
    UserListPageRender();
    $(".UserCreateHandler").click(UserCreateHandler);
});