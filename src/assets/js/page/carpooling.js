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
            $(".CarpoolingFromCityField").text(item.from_city);
            $(".CarpoolingToCityField").text(item.to_city);
            $(".CarpoolingDepartTimeField").text(CtsTimeFormat(item.depart_time));
            $(".CarpoolingPeopleCountField").text(item.people_count);
            $(".CarpoolingContactField").text(item.contact);
            $(".CarpoolingRemarkField").html(parseSpecialChar(item.remark));
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