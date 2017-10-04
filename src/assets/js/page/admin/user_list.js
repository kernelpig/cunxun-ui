function UserListPageRender() {
    NavbarRender();
    FootbarRender();
    UserListRender(location.href);
}

function UserDeleteHandler(pe) {
    $(".UserItemDeleteDialog").modal({
        relatedTarget: pe.target,
        onConfirm: function(e) {
            var userId = $(this.relatedTarget).attr("alt");
            APIUserDeleteById(userId, AlertShowAjaxError, function (data) {
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

function UserUpdateHandler(pe) {
    var relatedUserItemId = $(this).attr("alt");
    var relatedUserItemName = $("#UserListItem" + relatedUserItemId + " .UserNicknameField");
    var relatedUserItemRole = $("#UserListItem" + relatedUserItemId + " .UserRoleField");
    $(".UserItemNickname").val(relatedUserItemName.text()).attr("disabled", "");
    $(".UserItemRole").val(relatedUserItemRole.attr("UserRoleFieldValue"));

    $(".UserItemUpdateDialog").modal({
        relatedTarget: pe.target,
        onConfirm: function(e) {
            var req = {
                role: parseInt(e.data[1]) || userRoleNormal
            };
            APIUserUpdate(relatedUserItemId, req, AlertShowAjaxError, function (data) {
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
});