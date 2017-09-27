var ArticleCreateTemplate = '<div class="am-container am-margin-top">\n' +
    '    <form method="post" class="am-form" id="first_setup">\n' +
    '        <fieldset>\n' +
    '            <legend>发表新帖</legend>\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '\n' +
    '                <span class="am-input-group-label"><i class="am-icon-user am-icon-archive"></i></span>\n' +
    '                    <select id="column">\n' +
    '                    </select>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="am-form-group">\n' +
    '                <div class="am-input-group">\n' +
    '                    <span class="am-input-group-label"><i class="am-icon-user am-icon-pencil"></i></span>\n' +
    '                    <input type="text" id="title" value="" required placeholder="帖子标题">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="am-form-group">\n' +
    '                <textarea id="content" rows="6"></textarea>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="am-form-group">\n' +
    '                <input type="button" id="ArticleCreateHandler" value="提交" class="am-btn am-btn-primary am-btn-sm">\n' +
    '            </div>\n' +
    '        </fieldset>\n' +
    '    </form>\n' +
    '</div>';

// 加载column分类
function ColumnGetListHandler() {
    var req = {creater_uid: createrUidDefault};
    APIColumnGetList(req, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            if (!data["list"] || data['list'].length === 0) {
                return
            }
            $.each(data['list'], function () {
                var href = 'article.html?id=' + this.id;
                var link = $('<a class="am-list-item-hd"></a>').attr('href', href).text(this.title);
                $("#column").append($('<option></option>').val(this.id).text(this.name));
            });
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

// 创建文章
function ArticleCreateHandler() {
    var req = {
        column_id: parseInt($("#column").val()),
        title: $('#title').val(),
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

function ArticleCreateRender() {
    IsLogined();
    $(".ContentContainer").append(ArticleCreateTemplate);
    $('#content').froalaEditor({
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
    ColumnGetListHandler();
    $('#ArticleCreateHandler').click(ArticleCreateHandler);
}