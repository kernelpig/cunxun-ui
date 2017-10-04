function UserPageRender() {
    NavbarRender();
    FootbarRender();
}

function UserCreateHandler() {
    var req = {
        phone: "86 " + $(".UserItemPhone").val(),
        password: $(".UserItemPassword").val(),
        nickname: $(".UserItemNickname").val(),
        role: parseInt($(".UserItemRole").val()) || userRoleNormal
    };
    APIUserCreate(req, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            AlertShowAutoCloseAndGoPage("创建成功", "马上跳转当前页面!", "/user.html?user_id=" + data['id']);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function UserCreateRender() {
    $(".UserCreateHandler").click(UserCreateHandler);
}

$(document).ready(function () {
    UserPageRender();
    UserCreateRender();
    $(".am-form").validator(formValidator);
});