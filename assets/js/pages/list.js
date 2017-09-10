
function GetArticleList() {
    var getting = $.ajax({
        url: articleBaseURI + "/?column_id=" + currentPage.columnID + "&page_size=" + currentPage.pageSize + "&page_num=" + currentPage.pageNum,
        type: "get",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: ShowAlertAjax,
        success: function (data) {
            if (data['code'] === 0) {
                currentPage.isEnd = data['end'];
                currentPage.pageNum += 1;
                if (!data['list'] || data['list'].length === 0) {
                    ShowAlertAutoClose("请知晓", "亲,无更多数据");
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

function GetMoreArticle() {
    if (!currentPage.isEnd) {
        GetArticleList();
    } else {
        ShowAlertAutoClose("请知晓", "亲,无更多数据");
    }
}

function GetCurrentPageParam() {
    currentPage.columnID = GetURIParamInt("column_id");
    currentPage.pageSize = GetURIParamInt("page_size");
    currentPage.pageNum = GetURIParamInt("page_num");
}

var currentPage = {
    columnID: 0,
    pageSize: 0,
    pageNum: 0,
    isEnd: false,
};

$(document).ready(function () {
    GetCurrentPageParam();
    GetArticleList();

    $('.am-list-news-more').click(GetMoreArticle);
});