function IndexPageRender() {
    NavbarRender();
    FootbarRender();
}

$(document).ready(function () {
   IndexPageRender();

    APIUserGetInfo(Cookies.get('UserId'), AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            $(".UserNicknameField").text(data["nickname"]);
            $(".UserAvatarField").attr("src", serviceBaseURI + "/u/"+ Cookies.get('UserId') +"/avatar");
        } else {
            AlertShowError(data['sub_error']);
        }
    });
});