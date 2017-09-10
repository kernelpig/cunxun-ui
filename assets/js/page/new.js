
// 加载column分类
function ColumnGetListHandler() {
    APIColumnGetList(ShowAlertAjax, function (data) {
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
    });
}

// 创建文章
function ArticleCreateHandler() {
    var req = {
        column_id: 1,
        Title: $('#title').val(),
        content: $('#content').val()
    };
    APIArticleCreate(req, ShowAlertAjax, function (data) {
        if (data['code'] === 0) {
            ShowAlertAutoGoPage("创建成功", "马上返回到之前页面!", "/index.html");
        } else {
            ShowAlertError(data['sub_error']);
        }
    });
}

// 初始化处理
$(document).ready(function () {
    IsLogined();
    NavbarSetSignStatus();
    ColumnGetListHandler();
    $('#ArticleCreateHandler').click(ArticleCreateHandler);
});