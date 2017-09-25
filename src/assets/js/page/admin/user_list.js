
function NavbarItemUserGetList(pageEnv) {
    APIUserGetList(pageEnv, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            if (!data["list"] || data["list"].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
                return
            }
            $.each(data['list'], function (index, item) {
                var navbarItem = $(TypeListItemTemplate);
                navbarItem.find(".TypeListItemID").text(item.id);
                navbarItem.find(".TypeListItemName").text(item.name);
                navbarItem.find(".TypeListItemAuthor").text(item.nickname);
                navbarItem.find(".TypeListItemTime").text(GMT2Beijing(item.created_at));
                navbarItem.find(".TypeListItemUpdate").attr("alt", item.id);
                navbarItem.find(".TypeListItemDelete").attr("alt", item.id);
                $(".ListItemsContainer").append(navbarItem)
            });
            $(".TypeListItemUpdate").click(UserUpdateHandler);
            $(".TypeListItemDelete").click(UserDeleteHandler);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function UserListPageRender() {
    NavbarRender();
    FootbarRender();
    TypeListRender(location.href);
}

// 创建栏目
function UserCreateHandler() {
    $(".UserItemUpdateDialog").modal({
        relatedTarget: this,
        onConfirm: function(e) {
            APIUserCreate({name: e.data}, AlertShowAjaxError, function (data) {
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

// 修改栏目
function UserUpdateHandler(pe) {
    $(".UserItemUpdateDialog").modal({
        relatedTarget: pe.target,
        onConfirm: function(e) {
            var UserId = $(this.relatedTarget).attr("alt");
            APIUserUpdateById(UserId, {name: e.data}, AlertShowAjaxError, function (data) {
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

// 删除栏目
function UserDeleteHandler(pe) {
    $(".UserItemDeleteDialog").modal({
        relatedTarget: pe.target,
        onConfirm: function(e) {
            var UserId = $(this.relatedTarget).attr("alt");
            APIUserDeleteById(UserId, AlertShowAjaxError, function (data) {
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