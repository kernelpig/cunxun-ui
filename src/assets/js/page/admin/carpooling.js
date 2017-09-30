function CarpoolingPageRender() {
    NavbarRender();
    FootbarRender();
}

function CarpoolingCreateHandler() {
    var req = {
        from_city: $(".CarpoolingFromCityField").val(),
        to_city: $(".CarpoolingToCityField").val(),
        depart_time: $(".CarpoolingDepartTimeField").val(),
        people_count: parseInt($(".CarpoolingPeopleCountField").val()),
        remark: $(".CarpoolingRemarkField").val()
    };
    APICarpoolingCreate(req, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            AlertShowAutoCloseAndGoPage("创建成功", "马上跳转当前页面!", "/carpooling.html?carpooling_id=" + data['carpooling_id']);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function CarpoolingUpdateHandler() {
    var req = {
        column_id: parseInt($(".ColumnListField").val()),
        title: $(".CarpoolingTitleField").val(),
        content: $(".CarpoolingContentField").val()
    };
    var carpoolingId = GetURIParamStr(location.href, "carpooling_id");
    APICarpoolingUpdateById(carpoolingId, req, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            AlertShowAutoCloseAndGoPage("创建成功", "马上跳转当前页面!", "/carpooling.html?carpooling_id=" + carpoolingId);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function CarpoolingEditorRender() {
    $('.CarpoolingRemarkField').froalaEditor({
        theme: 'gray',
        height: 200,
        language: 'zh_cn',
        imageUploadParam: 'image_key',
        imageUploadURL: imageBaseURI + "/",
        imageUploadParams: {xToken: Cookies.get("Authorization")},
        imageUploadMethod: 'POST',
        imageMaxSize: imageUploadMaxSize,
        imageAllowedTypes: imageUploadTypes
    }).on('froalaEditor.image.error', froalaEditorImageUploadErrorHandler);
}

function CarpoolingDepartTimeRender() {
    $.fn.datetimepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今天",
        suffix: [],
        meridiem: ["上午", "下午"]
    };
    // TODO: 不能小于当前时间
    $(".CarpoolingDepartTimeField").datetimepicker({
        format: 'yyyy-mm-ddThh:ii:ssZ',
        language:  'zh-CN',
        autoclose: true
    });
}

function CarpoolingCreateRender() {
    CarpoolingDepartTimeRender();
    CarpoolingEditorRender();
    $(".CarpoolingActionHandler").click(CarpoolingCreateHandler);
}

function CarpoolingUpdateRender() {
    var req = {
        "carpooling_id": GetURIParamStr(location.href, "carpooling_id")
    };
    APICarpoolingGetItem(req, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            if (!data["item"]) {
                AlertShowAutoClose("不存在", "此拼车不存在");
                return
            }
            $(".ColumnListField").val(data["item"].column_id);
            $(".CarpoolingTitleField").val(data["item"].title);
            $('.CarpoolingContentField').val(data["item"].content);

            CarpoolingEditorRender();
            $(".CarpoolingActionHandler").click(CarpoolingUpdateHandler);
        } else {
            AlertShowError(data["sub_error"]);
        }
    });
}

$(document).ready(function () {
    CarpoolingPageRender();

    var action = GetURIParamStr(location.href, "action");
    if (action === "create") {
        CarpoolingCreateRender();
    } else if (action === "update") {
        CarpoolingUpdateRender();
    }
});