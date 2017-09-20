
var AvatarTemplate = '\n' +
    '<!--图片上传框-->\n' +
    '<div class="am-modal am-modal-no-btn up-frame-bj " tabindex="-1" id="AvatarUploadBox">\n' +
    '  <div class="am-modal-dialog up-frame-parent up-frame-radius">\n' +
    '\t<div class="am-modal-hd up-frame-header">\n' +
    '\t   <label>修改头像</label>\n' +
    '\t  <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>\n' +
    '\t</div>\n' +
    '\t<div class="am-modal-bd  up-frame-body">\n' +
    '\t  <div class="am-g am-fl">\n' +
    '\t\t<div class="am-form-group am-form-file">\n' +
    '\t\t  <div class="am-fl">\n' +
    '\t\t\t<button type="button" class="am-btn am-btn-default am-btn-sm">\n' +
    '\t\t\t  <i class="am-icon-cloud-upload"></i> 选择要上传的文件</button>\n' +
    '\t\t  </div>\n' +
    '\t\t  <input type="file" id="AvatarInputImageBox">\n' +
    '\t\t</div>\n' +
    '\t  </div>\n' +
    '\t  <div class="am-g am-fl" >\n' +
    '\t\t<div class="up-pre-before up-frame-radius">\n' +
    '\t\t\t<img alt="" src="" id="AvatarImageBox" >\n' +
    '\t\t</div>\n' +
    '\t\t<div class="up-pre-after up-frame-radius">\n' +
    '\t\t</div>\n' +
    '\t  </div>\n' +
    '\t  <div class="am-g am-fl">\n' +
    '\t\t<div class="up-control-btns">\n' +
    '\t\t\t<span class="am-icon-rotate-left"></span>\n' +
    '\t\t\t<span class="am-icon-rotate-right"></span>\n' +
    '\t\t\t<span class="am-icon-check" id="AvatarImageUploadButton"></span>\n' +
    '\t\t</div>\n' +
    '\t  </div>\n' +
    '\t</div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '<!--加载框-->\n' +
    '<div class="am-modal am-modal-loading am-modal-no-btn" tabindex="-1" id="AvatarLoadingBox">\n' +
    '  <div class="am-modal-dialog">\n' +
    '\t<div class="am-modal-hd">正在上传...</div>\n' +
    '\t<div class="am-modal-bd">\n' +
    '\t  <span class="am-icon-spinner am-icon-spin"></span>\n' +
    '\t</div>\n' +
    '  </div>\n' +
    '</div>';

// 上传文件后显示图片
function AvatarUploadChangeHandler() {
    if (this.files && this.files.length) {
        var urlObejct = window.urlObejct || window.webkitURL;
        var file = this.files[0];
        if (/^image\/\w+$/.test(file.type)) {
            AvatarImageUrlObject = urlObejct.createObjectURL(file);
            AvatarImageBox.one('built.cropper', function () {
                urlObejct.revokeObjectURL(AvatarImageUrlObject);
            }).cropper('reset').cropper('replace', AvatarImageUrlObject);
        } else {
            AlertShowError("请选择图像文件类型");
        }
    }
}

// 上传处理
function AvatarUploadClickHandler() {
    if (AvatarImageBox.attr("src") === "") {
        AlertShowError("没有选择上传的图片");
    } else {
        AvatarImageBytes = $("#AvatarImageBox").cropper('getCroppedCanvas', {width: AvatarWidthDefault, height: AvatarHeightDefault}).toDataURL(); //转成base64
        $("#AvatarUploadBox").modal('close');
    }
}

function AvatarImageRotateRight() {
    $("#AvatarImageBox").cropper('rotate', 45);
}

function AvatarImageRotateLeft() {
    $("#AvatarImageBox").cropper('rotate', -45);
}

var AvatarImageBox = null;
var AvatarImageUrlObject = null;
var AvatarImageBytes = "";

$(document).ready(function(){
    $("body").append(AvatarTemplate);

    AvatarImageBox = $('#AvatarImageBox').cropper({
        aspectRatio: '1',
        autoCropArea:0.8,
        preview: '.up-pre-after'
    });

    $('#AvatarInputImageBox').change(AvatarUploadChangeHandler);
    $('#AvatarImageUploadButton').click(AvatarUploadClickHandler);

    $(".am-icon-rotate-left").click(AvatarImageRotateLeft);
    $(".am-icon-rotate-right").click(AvatarImageRotateRight);
});