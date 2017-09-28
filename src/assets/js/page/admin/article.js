function ArticlePageRender() {
    NavbarRender();
    FootbarRender();
}

function ColumnGetListHandler() {
    var req = {creater_uid: createrUidDefault};
    APIColumnGetList(req, AlertShowAjaxError, function (data) {
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
            AlertShowAutoCloseAndGoPage("创建成功", "马上跳转当前页面!", "/article.html?article_id=" + data['article_id']);
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
    var articleId = GetURIParamStr(location.href, "article_id");
    APIArticleUpdateById(articleId, req, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            AlertShowAutoCloseAndGoPage("创建成功", "马上跳转当前页面!", "/article.html?article_id=" + articleId);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function ArticleEditorRender() {
    $('.ArticleContentField').froalaEditor({
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