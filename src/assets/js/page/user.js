function IndexPageRender() {
    NavbarRender();
    FootbarRender();
}

$(document).ready(function () {
    IndexPageRender();

    var userId = GetURIParamStr(location.href, "user_id");
    APIUserGetInfo(userId, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            $(".UserNicknameField").text(data["nickname"]);
            $(".UserAvatarField").attr("src", data["avatar"]);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
});