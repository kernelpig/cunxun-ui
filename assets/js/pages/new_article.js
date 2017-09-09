
// 加载column分类
function GetColumnList() {
    var list = [
        { id: 1, name: "资讯", },
        { id: 2, name: "帖子", },
        { id: 3, name: "交友", }
    ];
    if (list.length === 0) {
        $("#column").append($('<option></option>').val(0).text("无栏目"));
    } else {
        $.each(list, function () {
            $("#column").append($('<option></option>').val(this.id).text(this.name));
        });
    }
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