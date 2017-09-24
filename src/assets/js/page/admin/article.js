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

function ArticleUpdateHandler() {
    // TODO: 调用文章更新接口
}

function ArticleCreateRender() {
    $(".ArticleActionHandler").click(ArticleCreateHandler);
    // 没有找到编辑框的设置文本方法, 使用的较老版本, 暂时使用此方法规避掉
    // TODO: 更新为最新版本的编辑器
    $(".ArticleContentField").editable({
        inlineMode: false,
        alwaysBlank: true,
        theme: 'gray',
        height: 200,
        language: 'zh_cn',
        pluginsEnabled: ['fullscreen']
    });
}

function ArticleUpdateRender() {
    $(".ArticleActionHandler").click(ArticleUpdateHandler);
    var req = {
        "article_id": GetURIParamStr(location.href, "article_id")
    };
    APIArticleGetItem(req, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            $(".ColumnListField").val(data["item"].column_id);
            $(".ArticleTitleField").val(data["item"].title);
            $('.ArticleContentField').val(data["item"].content);
            // 没有找到编辑框的设置文本方法, 使用的较老版本, 暂时使用此方法规避掉
            // TODO: 更新为最新版本的编辑器
            $(".ArticleContentField").editable({
                inlineMode: false,
                alwaysBlank: true,
                theme: 'gray',
                height: 200,
                language: 'zh_cn',
                pluginsEnabled: ['fullscreen']
            });
            //$('.ArticleContentField').editable('html', data["item"].content);
        } else {
            AlertShowError(data["sub_error"]);
        }
    });
}

$(document).ready(function () {
    ArticlePageRender();
    ColumnGetListHandler();

    var action = GetURIParamStr(location.href, "action");
    if (action === "create") {
        ArticleCreateRender();
    } else if (action === "update") {
        ArticleUpdateRender();
    }
});