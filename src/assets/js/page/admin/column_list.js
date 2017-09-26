function ColumnListPageRender() {
    NavbarRender();
    FootbarRender();
    ColumnListRender(location.href);
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
    ColumnListPageRender();
    $(".ColumnCreateHandler").click(ColumnCreateHandler);
});