
function NavbarItemColumnGetList() {
    APIColumnGetList(AlertShowAjaxError, function (data) {
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
            $(".TypeListItemUpdate").click(ColumnUpdateHandler);
            $(".TypeListItemDelete").click(ColumnDeleteHandler);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function ColumnPageRender() {
    NavbarRender();
    FootbarRender();
    TypeListRender(location.href);
}

// 创建栏目
function ColumnCreateHandler() {
    $(".ColumnItemUpdateDialog").modal({
        relatedTarget: this,
        onConfirm: function(e) {
            APIColumnCreate({name: e.data}, AlertShowAjaxError, function (data) {
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
function ColumnUpdateHandler(pe) {
    $(".ColumnItemUpdateDialog").modal({
        relatedTarget: pe.target,
        onConfirm: function(e) {
            var columnId = $(this.relatedTarget).attr("alt");
            APIColumnUpdateById(columnId, {name: e.data}, AlertShowAjaxError, function (data) {
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
function ColumnDeleteHandler(pe) {
    $(".ColumnItemDeleteDialog").modal({
        relatedTarget: pe.target,
        onConfirm: function(e) {
            var columnId = $(this.relatedTarget).attr("alt");
            APIColumnDeleteById(columnId, AlertShowAjaxError, function (data) {
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
    ColumnPageRender();
    $(".ColumnCreateHandler").click(ColumnCreateHandler);
});