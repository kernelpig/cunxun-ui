
// 加载column分类
function GetColumnList() {
    var getting = $.ajax({
        url: columnBaseURI + "/",
        type: "get",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: ShowAlertAjax,
        success: function (data) {
            if (data['code'] === 0) {
                if (data['list'].length === 0) {
                    $("#column").append($('<li class="am-g">暂无数据</li>'));
                } else {
                    $.each(data['list'], function () {
                        var href = 'article.html?id=' + this.id;
                        var link = $('<a class="am-list-item-hd"></a>').attr('href', href).text(this.title);
                        $("#column").append($('<option></option>').val(this.id).text(this.name));
                    });
                }
            } else {
                ShowAlertError(data['sub_error']);
            }
        }
    });
}

// 创建文章
function CreateArticle() {
    var req = {
        column_id: 1,
        Title: $('#title').val(),
        content: $('#content').val()
    };
    var posting = $.ajax({
        url: articleBaseURI + "/",
        type: "post",
        headers: {"Authorization": Cookies.get('Authorization')},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        error: ShowAlertAjax,
        success: function (data) {
            if (data['code'] === 0) {
                ShowAlertAutoGoPage("创建成功", "马上返回到之前页面!", "/index.html");
            } else {
                ShowAlertError(data['sub_error']);
            }
        }
    });
}

// 初始化处理
$(document).ready(function () {
    IsLogined();
    SetSignStatus();
    GetColumnList();
    $('#create_article').click(CreateArticle);
});