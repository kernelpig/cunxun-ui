function ArticleGetListHandler(){APIArticleGetList(ArticleListPageEnv,AlertShowAjaxError,function(t){0===t.code?(ArticleListPageEnv.is_end=t.end,t.list&&0!==t.list.length?(ArticleListPageEnv.page_num+=1,$.each(t.list,function(){var t="article.html?article_id="+this.id,e=$('<a class="am-list-item-hd am-text-truncate am-u-sm-12 am-u-md-7 am-padding-left-sm"></a>').attr("href",t).text(this.title),a=$('<span class="am-list-author am-text-truncate am-u-md-2 am-show-lg-up am-text-center"></span>').text(this.nickname),i=$('<span class="am-list-stat am-u-md-1 am-show-lg-up am-text-center"></span>').text(this.comment_count),r=$('<span class="am-list-date am-u-md-2 am-show-lg-up am-text-center"></span>').text(CtsTimeFormat(this.updated_at));$(".am-list").append($('<li class="am-g"></li>').append(e).append(a).append(i).append(r))})):ArticleListPageEnv.page_num>1&&AlertShowAutoClose("请知晓","亲,无更多数据")):AlertShowError(t.sub_error)})}function ArticleGetMoreHandler(){ArticleListPageEnv.is_end?AlertShowAutoClose("请知晓","亲,无更多数据"):ArticleGetListHandler()}function ArticleListPageGetCurrentEnv(t){ArticleListPageEnv.column_id=GetURIParamIdValue(t,"column_id")||columnIdDefault,ArticleListPageEnv.order_by=GetURIParamStr(t,"order_by")||orderByDefault,ArticleListPageEnv.page_size=GetURIParamInt(t,"page_size")||PageSizeDefault,ArticleListPageEnv.page_num=GetURIParamInt(t,"page_num")||PageStartNumberDefault}function ArticleListButtonToggle(){ArticleListPageEnv.page_size=PageSizeDefault,ArticleListPageEnv.page_num=PageStartNumberDefault,ArticleListPageEnv.order_by===orderByCommentCount?($(".ArticleListOrderByCommentCount").addClass("am-btn-primary"),$(".ArticleListOrderByCreateDate").removeClass("am-btn-primary").addClass("am-btn-default")):($(".ArticleListOrderByCreateDate").addClass("am-btn-primary"),$(".ArticleListOrderByCommentCount").removeClass("am-btn-primary").addClass("am-btn-default")),$(".am-list").html(""),ArticleGetListHandler()}function ArticleListLinkRender(){$(".ArticleListOrderByCommentCount").click(function(){ArticleListPageEnv.order_by=orderByCommentCount,ArticleListButtonToggle()}),$(".ArticleListOrderByCreateDate").click(function(){ArticleListPageEnv.order_by=orderByCreateDate,ArticleListButtonToggle()})}function ArticleListRender(t){$(".ContentContainer").append(ArticleListTemplate),ArticleListPageGetCurrentEnv(t),ArticleListLinkRender(),ArticleListButtonToggle(),$("#ArticleGetMoreHandler").click(ArticleGetMoreHandler)}var ArticleListTemplate='<div data-am-widget="list_news" class="am-list-news am-list-news-default" >\n    <!--列表标题-->\n    <div class="am-list-news-hd am-cf">\n        <!--带更多链接-->\n            <button class="am-btn am-btn-sm ArticleListTitle ArticleListOrderByCreateDate">最新</button>\n            <button class="am-btn am-btn-sm ArticleListTitle ArticleListOrderByCommentCount">最热</button>\n    </div>\n    <div class="am-list-news-bd">\n        <ul class="am-list">\n        </ul>\n    </div>\n    <!--更多在底部-->\n    <div class="am-list-news-ft">\n        <a class="am-list-news-more am-btn am-btn-default" id="ArticleGetMoreHandler" href="###">查看更多 &raquo;</a>\n    </div>\n</div>',ArticleListPageEnv={creater_uid:createrUidDefault,column_id:columnIdDefault,order_by:orderByDefault,page_size:PageSizeDefault,page_num:PageStartNumberDefault,is_end:!1};