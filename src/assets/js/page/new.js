
// 加载column分类
function ColumnGetListHandler() {
    APIColumnGetList(AlertShowAjaxError, function (data) {
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
            AlertShowError(data['sub_error']);
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
    APIArticleCreate(req, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            AlertShowAutoCloseAndGoPage("创建成功", "马上返回到之前页面!", "/index.html");
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function NewPageRender() {
    NavbarRender();
    FootbarRender();
}

// 初始化处理
$(document).ready(function () {
    NewPageRender();

    IsLogined();
    ColumnGetListHandler();
    $('#ArticleCreateHandler').click(ArticleCreateHandler);
});