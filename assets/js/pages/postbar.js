
function GetArticleList() {
    var getting = $.ajax({
        url: articleBaseURI + "/?column_id=1&page_size=20&page_num=1",
        type: "get",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: ShowAlertAjax,
        success: function (data) {
            if (data['code'] === 0) {
                if (!data['list'] || data['list'].length === 0) {
                    $(".am-list").append($('<li class="am-g">暂无数据</li>'));
                } else {
                    $.each(data['list'], function () {
                        var href = 'article.html?id=' + this.id;
                        var link = $('<a class="am-list-item-hd"></a>').attr('href', href).text(this.title);
                        $(".am-list").append($('<li class="am-g"></li>').append(link));
                    });
                }
            } else {
                ShowAlertError(data['sub_error']);
            }
        }
    });
}

$(document).ready(function () {
    GetArticleList();
});