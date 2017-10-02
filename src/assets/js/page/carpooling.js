function CarpoolingPageRender() {
    NavbarRender();
    FootbarRender();
    var carpoolingId = GetURIParamStr(location.href, "carpooling_id");
    CommentRender(location.href + "&relate_id=" + carpoolingId);
}

function CarpoolingGetHandler() {
    APICarpoolingGetItem(CarpoolingDetailEnv, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            if (!data['list'] || data["list"].length <= 0) {
                return
            }
            var item = data["list"][0];
            $(".CarpoolingFromCityField").val(item.from_city);
            $(".CarpoolingToCityField").val(item.to_city);
            $(".CarpoolingDepartTimeField").val(CtsTimeFormat(item.depart_time));
            $(".CarpoolingPeopleCountField").val(item.people_count);
            $(".CarpoolingContactField").val(item.contact);
            $(".CarpoolingRemarkField").html(item.remark);
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