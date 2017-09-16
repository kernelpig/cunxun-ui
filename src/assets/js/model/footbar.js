var FootbarTemplate = '<footer data-am-widget="footer"\n' +
    '        class="am-footer am-footer-default am-footer am-topbar-fixed-bottom">\n' +
    '    <hr class="am-divider am-divider-default" />\n' +
    '    <div class="am-footer-miscs ">\n' +
    '        <p class="Copyright"></p>\n' +
    '        <p class="RecordNumber"></p>\n' +
    '    </div>\n' +
    '</footer>';

var FootbarEnv = {
    copyright: "CopyRight©2017 王大脸 Inc.",
    record_number: "京ICP备13033158"
};

function FootbarRender() {
    var footbar = $(FootbarTemplate);
    footbar.find(".Copyright").text(FootbarEnv.copyright);
    footbar.find(".RecordNumber").text(FootbarEnv.record_number);
    $('body').append(footbar);
}