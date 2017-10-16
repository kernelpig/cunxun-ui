// 使用phantomjs做搜索引擎server，将需要做SEO的链接动态解析后返回，
// 具体参考：http://phantomjs.org/api/webserver/
// https://github.com/ariya/phantomjs/

// 导入包
var fs = require("fs");
var page = require('webpage').create();

// 配置信息
var urlFilePath = "../urls.txt";
var exportDir = "./spider";

// 获取url中的文件名
function getPageName(url) {
    var tmp = url.split("/");
    return tmp[tmp.length - 1].split("?")[0];
}

// 读取文件
function readAllURI() {
    var f = fs.open(urlFilePath, "r");
    var urls = f.read();
    f.close();
    return urls.split("\n");
}

// 写入文件
function writeFile(filename, content) {
    console.log("=========", filename);
    console.log("=========", content);
    var oldWorkPath = fs.workingDirectory;
    fs.changeWorkingDirectory(exportDir);
    var f = fs.open(filename, "w");
    f.write(content);
    f.close();
    fs.changeWorkingDirectory(oldWorkPath);
}

// 遍历链接
function walkAllURI(urls) {
    for (i in urls) {
        console.log(urls[i]);
        renderAjaxPage(urls[i]);
    }
    console.log("-------over------");
}

// 获取渲染后的内容
function renderAjaxPage(url) {
    page.open(url, function (status) {
        if (status !== 'success') {
            console.log("Failed to get url: ", url);
        } else {
            var pageName = getPageName(url);
            phantom.outputEncoding = "utf8";
            writeFile(pageName, page.content);
        }
    });
}

// 主过程
(function main() {
    var urls = readAllURI();
    walkAllURI(urls);
    phantom.exit();
})();