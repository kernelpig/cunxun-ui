/*
* 使用fis3, 官方文档 http://fis.baidu.com/fis3/docs/beginning/release.html
* 1. js, css, png文件压缩；
* 2. js, css文件升级hash命名, 用来版本升级cdn缓存刷新；
* 3. 生成release: fis3 release -d ../output
* 4. 生成debug: fis3 release debug -d ../output
* */

// 加 md5
fis.match('*.{js,css}', {
    useHash: true
});

// fis-optimizer-uglify-js 插件进行压缩, fis内置
fis.match('*.js', {
    optimizer: fis.plugin('uglify-js')
});

// fis-optimizer-clean-css 插件进行压缩, fis内置
fis.match('*.css', {
    optimizer: fis.plugin('clean-css')
});

// fis-optimizer-png-compressor 插件压缩, fis内置
fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

// 调试模式
fis.media('debug').match('*.{js,css,png}', {
    useHash: false,
    useSprite: false,
    optimizer: null
});