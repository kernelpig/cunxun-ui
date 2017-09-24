
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
                $(".ListItemsContainer").append(navbarItem)
            })
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
    $(".ColumnItemContainer").modal({
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
function ColumnUpdateHandler() {
    alert("update");
}

$(document).ready(function () {
    ColumnPageRender();
    $(".ColumnCreateHandler").click(ColumnCreateHandler);
    $(".TypeListItemUpdate").on("click", ColumnUpdateHandler);
});