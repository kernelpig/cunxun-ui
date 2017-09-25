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
    var req = {
        column_id: parseInt($(".ColumnListField").val()),
        title: $(".ArticleTitleField").val(),
        content: $(".ArticleContentField").val()
    };
    APIArticleUpdateById(GetURIParamStr(location.href, "article_id"), req, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            AlertShowAutoCloseAndGoPage("创建成功", "马上返回到之前页面!", "/admin/index.html");
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function ArticleEditorRender() {
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

function ArticleCreateRender() {
    ArticleEditorRender();
    $(".ArticleActionHandler").click(ArticleCreateHandler);
}

function ArticleUpdateRender() {
    var req = {
        "article_id": GetURIParamStr(location.href, "article_id")
    };
    APIArticleGetItem(req, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            if (!data["item"]) {
                AlertShowAutoClose("不存在", "此文章不存在");
                return
            }
            $(".ColumnListField").val(data["item"].column_id);
            $(".ArticleTitleField").val(data["item"].title);
            $('.ArticleContentField').val(data["item"].content);

            ArticleEditorRender();
            $(".ArticleActionHandler").click(ArticleUpdateHandler);
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