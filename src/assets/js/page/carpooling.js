function CarpoolingPageRender() {
    NavbarRender();
    FootbarRender();
}

function CarpoolingGetHandler() {
    APICarpoolingGetItem(CarpoolingDetailEnv, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            if (!data['item']) {
                return
            }
            $(".CarpoolingFromCityField").val(data["item"].from_city);
            $(".CarpoolingToCityField").val(data["item"].to_city);
            $(".CarpoolingDepartTimeField").val(GMT2Beijing(data["item"].depart_time));
            $(".CarpoolingPeopleCountField").val(data["item"].people_count);
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
    CarpoolingDetailEnv.carpooling_id = GetURIParamInt(currentUrl, "carpooling_id") || 1
}

$(document).ready(function () {
    CarpoolingPageRender();
    CarpoolingCurrentEnv(location.href);
    CarpoolingGetHandler();
});