
// 删除文章
function CarpoolingDeleteHandler(pe) {
    $(".CarpoolingItemDeleteDialog").modal({
        relatedTarget: pe.target,
        onConfirm: function(e) {
            var carpoolingId = $(this.relatedTarget).attr("alt");
            APICarpoolingDeleteById(carpoolingId, AlertShowAjaxError, function (data) {
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

function CarpoolingListPageRender() {
    NavbarRender();
    FootbarRender();
    CarpoolingListRender(location.href);
}

$(document).ready(function () {
    CarpoolingListPageRender();
});