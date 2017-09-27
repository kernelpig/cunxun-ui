function froalaEditorImageUploadErrorHandler(e, editor, error, response) {
    if (error.code === 1) {
        // Bad link.
    }
    else if (error.code === 2) {
        // No link in upload response.
    }
    else if (error.code === 3) {
        // Error during image upload.
        AlertShowAutoClose("图片上传", JSON.parse(response).sub_error);
    }
    else if (error.code === 4) {
        // Parsing response failed.
        AlertShowAutoClose("图片上传", "响应解析错误: " + response);
    }
    else if (error.code === 5) {
        // Image too text-large.
        AlertShowAutoClose("图片上传", "图片超大, 限制在" + imageUploadMaxSize + "字节大小");
    }
    else if (error.code === 6) {
        // Invalid image type.
        AlertShowAutoClose("图片上传", "限制图片类型, 必须为以下类型: " + imageUploadTypes);
    }
    else if (error.code === 7) {
        // Image can be uploaded only to same domain in IE 8 and IE 9.
        AlertShowAutoClose("图片上传", "IE8/9不允许跨域");
    }
}