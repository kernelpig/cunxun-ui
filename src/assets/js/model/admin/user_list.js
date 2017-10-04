var UserListTemplate = '<table class="am-table am-table-striped am-table-compact am-text-sm am-text-primary">\n' +
    '        <thead>\n' +
    '        <tr>\n' +
    '            <th class="am-show-lg-up">ID</th>\n' +
    '            <th class="">昵称</th>\n' +
    '            <th class="am-show-lg-up">手机</th>\n' +
    '            <th class="am-show-lg-up">角色</th>\n' +
    '            <th class="am-show-lg-up">时间</th>\n' +
    '            <th class="">操作</th>\n' +
    '        </tr>\n' +
    '        </thead>\n' +
    '        <tbody class="ListItemsContainer">\n' +
    '        </tbody>\n' +
    '    </table>\n' +
    '    <!--更多在底部-->\n' +
    '    <div class="am-list-news-ft">\n' +
    '        <a class="am-list-news-more am-btn am-btn-default UserGetMoreHandler" href="###">查看更多 &raquo;</a>\n' +
    '    </div>';

var UserListItemTemplate = '<tr>\n' +
    '            <td class="am-show-lg-up"><a class="UserIdField"></a></td>\n' +
    '            <td><a class="UserNicknameField"></a></td>\n' +
    '            <td class="am-show-lg-up"><a class="UserPhoneField"></a></td>\n' +
    '            <td class="am-show-lg-up UserRoleField"></td>\n' +
    '            <td class="UserCreatedAtField am-show-lg-up"></td>\n' +
    '            <td>\n' +
    '                <a class="am-btn am-btn-xs am-btn-default am-icon-pencil UserItemUpdateHandler">修改</a>\n' +
    '                <a class="am-btn am-btn-xs am-btn-primary am-icon-trash UserItemDeleteHandler">删除</a>\n' +
    '            </td>\n' +
    '        </tr>\n';

function UserGetMoreHandler() {
    if (!UserListPageEnv.is_end) {
        NavbarItemUserGetList(UserListPageEnv);
    } else {
        AlertShowAutoClose("请知晓", "亲,无更多数据");
    }
}

function UserListPageGetCurrentEnv(currentUrl) {
    UserListPageEnv.type_id = GetURIParamInt(currentUrl, "type_id") || typeIdDefault;
    UserListPageEnv.order_by = GetURIParamStr(currentUrl, "order_by") || orderByDefault;
    UserListPageEnv.page_size = GetURIParamInt(currentUrl, "page_size") || PageSizeDefault;
    UserListPageEnv.page_num = GetURIParamInt(currentUrl, "page_num") || PageStartNumberDefault;
}

var UserListPageEnv = {
    type_id: typeIdDefault,
    creater_uid: Cookies.get("UserId") || createrUidDefault,
    column_id: columnIdDefault,
    article_id: articleIdDefault,
    order_by: orderByDefault,
    page_size: PageSizeDefault,
    page_num: PageStartNumberDefault,
    is_end: false
};

function NavbarItemUserGetList(pageEnv) {
    APIUserGetList(UserListPageEnv, AlertShowAjaxError, function (data) {
        if (data["code"] === 0) {
            UserListPageEnv.is_end = data["end"];
            if (!data["list"] || data["list"].length === 0) {
                AlertShowAutoClose("请知晓", "亲,无更多数据");
                return
            }
            UserListPageEnv.page_num += 1;
            $.each(data['list'], function (index, item) {
                var navbarItem = $(UserListItemTemplate);
                navbarItem.attr("id", "UserListItem" + item.id);
                navbarItem.find(".UserIdField").text(item.id);
                navbarItem.find(".UserNicknameField").text(item.nickname);
                navbarItem.find(".UserPhoneField").text(item.phone);
                navbarItem.find(".UserRoleField").text(userRoleInfo[item.role]);
                navbarItem.find(".UserRoleField").attr("UserRoleFieldValue", item.role);
                navbarItem.find(".UserCreatedAtField").text(CtsTimeFormat(item.created_at));
                navbarItem.find(".UserItemUpdateHandler").attr("alt", item.id);
                navbarItem.find(".UserItemDeleteHandler").attr("alt", item.id);
                $(".ListItemsContainer").append(navbarItem);
            });
            $(".UserItemUpdateHandler").click(UserUpdateHandler);
            $(".UserItemDeleteHandler").click(UserDeleteHandler);
        } else {
            AlertShowError(data['sub_error']);
        }
    });
}

function UserListRender(currentUrl) {
    $(".ContentContainer").append(UserListTemplate);
    UserListPageGetCurrentEnv(currentUrl);
    if (UserListPageEnv.order_by === orderByCommentCount) {
        $(".UserListTitle").text("热度排序");
    } else {
        $(".UserListTitle").text("时间排序");
    }
    NavbarItemUserGetList();
    $(".UserGetMoreHandler").click(UserGetMoreHandler);
}