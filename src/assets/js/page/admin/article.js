function ArticlePageRender() {
    NavbarRender();
    FootbarRender();
}

function ColumnGetListHandler() {
    APIColumnGetList(AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            if (data['list'].length !== 0) {
                $.each(data['list'], function () {
                    $(".ColumnListField").append($('<option></option>').val(this.id).text(this.name));
                });
            }
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function ArticleCreateHandler() {
    var req = {
        column_id: parseInt($(".ColumnListField").val()),
        Title: $(".ArticleTitleField").val(),
        content: $(".ArticleContentField").val()
    };
    APIArticleCreate(req, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            AlertShowAutoCloseAndGoPage("创建成功", "马上返回到之前页面!", "/admin/index.html");
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function ArticleCreateRender() {
    // 加载栏目列表
    ColumnGetListHandler();
    $(".ArticleActionHandler").click(ArticleCreateHandler);
}

$(document).ready(function () {
    ArticlePageRender();
    $(".ArticleContentField").editable({
        inlineMode: false,
        alwaysBlank: true,
        theme: 'gray',
        height: 200,
        language: 'zh_cn',
        pluginsEnabled: ['fullscreen']
    });
    var action = GetURIParamStr(location.href, "action");
    if (action === "create") {
        ArticleCreateRender();
    } else if (action === "update") {

    }
});