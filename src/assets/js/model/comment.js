var CommentTemplate = '<hr><ul class="am-comments-list am-comments-list-flip">\n' +
    '        </ul>\n' +
    '        <button type="button" class="am-btn am-center am-btn-default CommentGetMoreHandler">查看更多</button>' + '<hr>\n' +
    '    <div class="am-u-sm-centered am-u-sm-11 am-padding-bottom-lg">\n' +
    '        <form method="post" class="am-form" id="first_setup">\n' +
    '            <fieldset>\n' +
    '                <div class="am-form-group">\n' +
    '                    <textarea class="CommentContentField" rows="10" placeholder="跟帖内容"></textarea>\n' +
    '                </div>\n' +
    '                <div class="am-form-group">\n' +
    '                    <input type="button" value="发表跟帖" class="am-btn am-btn-primary am-btn-sm CommentCreateHandler">\n' +
    '                </div>\n' +
    '            </fieldset>\n' +
    '        </form>\n' +
    '    </div>';

var CommentItemTemplate = '<li class="am-comment">\n' +
    '                <article class="am-comment">\n' +
    '                    <a href="#" class="UserHomePageLink">\n' +
    '                        <img src="" alt="" class="am-comment-avatar UserAvatarField" width="48" height="48"/>\n' +
    '                    </a>\n' +
    '                    <div class="am-comment-main">\n' +
    '                        <header class="am-comment-hd">\n' +
    '                            <div class="am-comment-meta">\n' +
    '                                <a href="#" class="am-comment-author UserHomePageLink UserNameField">某人</a>\n' +
    '                                评论于 <time class="CommentCreatedAtField">2014-7-12 15:30</time>\n' +
    '                            </div>\n' +
    '                        </header>\n' +
    '                        <div class="am-comment-bd CommentContentItemField">\n' +
    '                            评论内容\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </article>\n' +
    '            </li>';

var CommentListPageEnv = {
    article_id: 0,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

function CommentListPageGetCurrentEnv() {
    CommentListPageEnv.article_id = GetURIParamInt("article_id");
    CommentListPageEnv.page_size = GetURIParamInt("page_size") || PageSizeDefault;
    CommentListPageEnv.page_num = GetURIParamInt("page_num") || PageStartNumberDefault;
}

function CommentGetListHandler() {
    APICommentGetList(CommentListPageEnv, AlertShowAjaxError, function (data) {
        if (data['code'] === 0) {
            CommentListPageEnv.is_end = data['end'];
            CommentListPageEnv.page_num += 1;
            if (!data['list'] || data['list'].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
            } else {
                $.each(data['list'], function () {
                    // 评论列表项, 包括发表人, 发表时间, 发表内容
                    var item = $(CommentItemTemplate);
                    item.find(".UserNameField").text(this.nickname);
                    item.find(".CommentCreatedAtField").text(this.created_at);
                    item.find(".CommentContentItemField").text(this.content);
                    item.find(".UserHomePageLink").attr("href", "/user.html?user_id="+this.id);
                    $(".am-comments-list").append(item);
                });
            }
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function CommentGetMoreHandler() {
    if (!CommentListPageEnv.is_end) {
        CommentGetListHandler();
    } else {
        AlertShowAutoClose("请知晓", "亲,无更多数据");
    }
}

function CommentCreateHandler() {
    var req = {
        article_id: CommentListPageEnv.article_id,
        content: $(".CommentContentField").val()
    };
    APICommentCreate(req, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            location.reload();
        } else {
            AlertShowError(data["sub_error"]);
        }
    });
}

$(document).ready(function () {
    $(".ContentContainer").append($(CommentTemplate));
    CommentListPageGetCurrentEnv();
    CommentGetListHandler();
    $(".CommentGetMoreHandler").click(CommentGetMoreHandler);
    $(".CommentCreateHandler").click(CommentCreateHandler);
});