var template = '<div class="am-modal am-modal-no-btn" tabindex="-1" id="alert">\n' +
    '        <div class="am-modal-dialog">\n' +
    '            <div class="am-modal-hd">\n' +
    '                <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>\n' +
    '            </div>\n' +
    '            <div class="am-modal-bd">\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>';


// 显示提示信息
function ShowAlert(title, content, interval) {
    if ($('#alert').length === 0) {
        $('body').append(template);
    }
    $('.am-modal-hd').text(title);
    $('.am-modal-bd').html(content);
    $('#alert').modal();
    if (interval !== 0) {
        setTimeout(function () {
            $('#alert').modal('close');
        }, interval);
    }
}

// 显示提示信息并自动关闭
function ShowAlertAutoClose(title, content) {
    ShowAlert(title, content, 1000);
}

// 显示提示信息不自动关闭
function ShowAlertNotClose(title, content) {
    ShowAlert(title, content, 0);
}

// 显示错误信息
function ShowAlertError(error) {
    ShowAlertAutoClose("请求失败", error);
}

// 显示提示信息并自动关闭
function ShowAlertAutoGoPage(title, content, gotoPage) {
    ShowAlertNotClose(title, content);
    setTimeout(function () {
        GoToPage(gotoPage);
    }, 3000)
}

// 显示ajax请求后端接口错误
function ShowAlertAjax(e) {
    if (e.responseJSON) {
        ShowAlertError(e.responseJSON.sub_error);
    } else if (e.responseText) {
        ShowAlertError(e.responseText);
    } else {
        ShowAlertError(JSON.stringify(e));
    }
}