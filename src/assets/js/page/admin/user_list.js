function UserListPageRender() {
    NavbarRender();
    FootbarRender();
    UserListRender(location.href);
}

function UserCreateHandler() {
    $(".UserItemUpdateDialog").modal({
        relatedTarget: this,
        onConfirm: function(e) {
            var req = {
                phone: "86 " + e.data[0],
                password: e.data[1],
                nickname: e.data[2],
                role: parseInt(e.data[3]) || userRoleNormal
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

function UserUpdateHandler(pe) {
    var relatedUserItemId = $(this).attr("alt");
    var relatedUserItemName = $("#UserListItem" + relatedUserItemId + " .UserNicknameField");
    $(".UserItemPhone").addClass("am-hide");
    $(".UserItemPassword").addClass("am-hide");
    $(".UserItemRoleSuper").addClass("am-hide");
    $(".UserItemNickname").val(relatedUserItemName.text()).addClass("am-disable");

    $(".UserItemUpdateDialog").modal({
        relatedTarget: pe.target,
        onConfirm: function(e) {
            var req = {
                role: parseInt(e.data[3]) || userRoleNormal
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
    $(".UserCreateHandler").click(UserCreateHandler);
});