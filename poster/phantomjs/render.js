// 使用phantomjs做搜索引擎server，将需要做SEO的链接动态解析后返回，
// 具体参考：http://phantomjs.org/api/webserver/
// https://github.com/ariya/phantomjs/
// http://npm.taobao.org/dist/phantomjs/

// 导入包
var fs = require("fs");
var webpage = require('webpage');

// 常量信息
var startFlag = "++++++++";
var endFlag = "-------";

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
    console.log(startFlag);
    console.log("+ begin read all urls.");
    var f = fs.open(urlFilePath, "r");
    var urls = f.read();
    f.close();
    console.log(" end read all urls.");
    console.log(endFlag);
    return urls.split("\n");
}

// 写入文件
function writeFile(filename, content) {
    console.log(startFlag);
    console.log("+ begin write file.", filename, content);
    var oldWorkPath = fs.workingDirectory;
    fs.changeWorkingDirectory(exportDir);
    var f = fs.open(filename, "w");
    f.write(content);
    f.close();
    fs.changeWorkingDirectory(oldWorkPath);
    console.log(" end write file.");
    console.log(endFlag);
}

// 遍历链接
function walkAllURI(urls) {
    console.log(startFlag);
    console.log("+ begin walk all urls.");
    for (var i = 0; i < urls.length; i++) {
        if(urls[i].length > 0) {
            console.log(urls[i]);
            renderAjaxPage(urls[i]);
        }
    }
    console.log(" end walk all urls.");
    console.log(endFlag);
}

// 获取渲染后的内容
function renderAjaxPage(url) {
    console.log(startFlag);
    console.log("+ begin render ajax page.", url);
    page = webpage.create();
    page.open(url, function (status) {
        if (status !== 'success') {
            console.log("Failed to get url: ", url);
        } else {
            var pageName = getPageName(url);
            phantom.outputEncoding = "utf8";
            writeFile(pageName, page.content);
        }
    });
    console.log(" end render ajax page.");
    console.log(endFlag);
}

// 主过程
(function main() {
    //renderAjaxPage("http://www.lunxue.cc/news_list.html?column_id=1&page_size=10&page_num=1");
    var urls = readAllURI();
    walkAllURI(urls);
    phantom.exit();
})();