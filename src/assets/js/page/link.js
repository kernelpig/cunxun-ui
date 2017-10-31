
var LinkListTemplate = '<ul class="am-avg-sm-2 am-avg-md-4 am-avg-lg-6 am-thumbnails am-margin-top LinkListContainer">\n' +
    '    </ul>';

var LinkListItemTemplate = '            <li><div class="am-panel am-panel-default">\n' +
    '                <ul class="am-list am-list-static">\n' +
    '                    <li><img class="am-img-responsive WeixinQrcode" /></li>\n' +
    '                    <li class="am-list-item-text am-text-center WeixinName">菏泽交警</li>\n' +
    '                </ul>\n' +
    '            </div></li>\n';

var LinkListItems = [
    {
        id: "hezefabu",
        name: "菏泽发布"
    },
    {
        id: "hezegongan",
        name: "菏泽公安"
    },
    {
        id: "hezejiaotong",
        name: "菏泽交通"
    },
    {
        id: "hezejiaojing",
        name: "菏泽交警"
    },
    {
        id: "NBSAutoTest",
        name: "菏泽老乡"
    },
    {
        id: "dzw5122000",
        name: "菏泽大众"
    },
    {
        id: "hezesohu",
        name: "菏泽焦点"
    },
    {
        id: "zsheze",
        name: "掌上菏泽"
    },
    {
        id: "NBSAutoTest",
        name: "菏泽老乡"
    },
    {
        id: "NBSAutoTest",
        name: "菏泽老乡"
    },
    {
        id: "NBSAutoTest",
        name: "菏泽老乡"
    },
    {
        id: "NBSAutoTest",
        name: "菏泽老乡"
    }
];

var WeixinQrcodeUrl = "http://oss.lunxue.cc/weixin/";

function LinkListRender() {
    var $linkList = $(LinkListTemplate);
    $.each(LinkListItems, function (index, item) {
        var qrcode = WeixinQrcodeUrl + item.id + ".png";
        var $item = $(LinkListItemTemplate);
        $item.find(".WeixinQrcode").attr("src", qrcode);
        $item.find(".WeixinName").text(item.name);
        $linkList.append($item);
    });
    $(".ContentContainer").append($linkList);
}

function CarpoolingPageRender() {
    NavbarRender();
    FootbarRender();
    LinkListRender();
}

$(document).ready(function () {
    CarpoolingPageRender();
});