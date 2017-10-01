function CarpoolingPageRender() {
    NavbarRender();
    FootbarRender();
    var carpoolingId = GetURIParamStr(location.href, "carpooling_id");
    CommentRender(location.href + "&relate_id=" + carpoolingId);
}

function CarpoolingGetHandler() {
    APICarpoolingGetItem(CarpoolingDetailEnv, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            if (!data['item']) {
                return
            }
            $(".CarpoolingFromCityField").val(data["item"].from_city);
            $(".CarpoolingToCityField").val(data["item"].to_city);
            $(".CarpoolingDepartTimeField").val(CtsTimeFormat(data["item"].depart_time));
            $(".CarpoolingPeopleCountField").val(data["item"].people_count);
            $(".CarpoolingContactField").val(data["item"].contact);
            $(".CarpoolingRemarkField").html(data["item"].remark);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

var CarpoolingDetailEnv = {
    carpooling_id: 0
};

function CarpoolingCurrentEnv(currentUrl) {
    CarpoolingDetailEnv.carpooling_id = GetURIParamIdValue(currentUrl, "carpooling_id") || carpoolingIdDefault
}

$(document).ready(function () {
    CarpoolingPageRender();
    CarpoolingCurrentEnv(location.href);
    CarpoolingGetHandler();
});