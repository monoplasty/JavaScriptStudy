console.log('-----------emoji.js---------------');
function emojiToUnicode(emoji) {
    var backStr = '';
    if (emoji && emoji.length > 0) {
        for (var char of emoji) {
            var index = char.codePointAt(0);
            if (index > 65535) {
                var h =
                    '\\u' +
                    (Math.floor((index - 0x10000) / 0x400) + 0xd800).toString(
                        16
                    );
                var c =
                    '\\u' + ((index - 0x10000) % 0x400 + 0xdc00).toString(16);
                backStr = backStr + h + c;
            } else {
                backStr = backStr + char;
            }
        }
        console.log(backStr);
    }
    return backStr;
}

function utf16toEntities(str) {
    //检测utf16emoji表情 转换为实体字符以供后台存储
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g;
    str = str.replace(patt, function(char) {
        var H, L, code;
        if (char.length === 2) {
            //辅助平面字符（我们需要做处理的一类）
            H = char.charCodeAt(0); // 取出高位
            L = char.charCodeAt(1); // 取出低位
            code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
            return '&#' + code + ';';
        } else {
            return char;
        }
    });
    return str;
}

console.log('ssss---->', emojiToUnicode('😀adfa我们'));
// console.log('utf16toEntities222222--->', utf16toEntities('\ud83d\ude00adfa我们'))
$('.box').append(utf16toEntities('\ud83d\ude00adfa我们'));

///////  方法2  //////
var num1 = parseInt('1f632', 16);
var num = '&#' + num1 + ';';
console.log('utf16toEntities--->', num);
$('.box').append(num);
//////////////////////

////////// 方法3 ////////////
function findSurrogatePair(point) {
    // assumes point > 0xffff
    var offset = point - 0x10000,
        lead = 0xd800 + (offset >> 10),
        trail = 0xdc00 + (offset & 0x3ff);
    return [lead.toString(16), trail.toString(16)].map(function(item) {
        return '0x' + item;
    });
}

var aaa = findSurrogatePair(0x1f632);
console.log('findSurrogatePair--aaa->', String.fromCharCode.apply(String, aaa));
$('.box').append(String.fromCharCode.apply(String, aaa));

// 爬取页面元素 组成
function getDocEle(childEle) {
    var resHtml = '';
    Array.prototype.forEach.call(childEle, a => {
        var id = a.id.split('-')[1];
        var html = a.getElementsByClassName('name')[0].innerText;
        var res = `<span class="emoji emoji${id}" title="${html}"></span>`;
        resHtml += res;
    });
    console.log(resHtml);
    return resHtml;
}

////////////--main--/////////////////
var lastEditRange;
var editEle = document.getElementById('edit');
// 编辑框点击事件
editEle.onclick = function() {
    // 获取选定对象
    var selection = getSelection();
    // 设置最后光标对象
    lastEditRange = selection.getRangeAt(0);
};

// 编辑框按键弹起事件
editEle.onkeyup = function() {
    // 获取选定对象
    var selection = getSelection();
    // 设置最后光标对象
    lastEditRange = selection.getRangeAt(0);
};

$('.emoji-btn').on('click', function(e) {
    e.stopPropagation();
    var target = $('.emoji-content-select');
    target.toggleClass('select-display');
});

// 选择表情
$('.emoji-content-select').on('click', function(e) {
    var target = e.target;
    if ($(target).children().length == 0) { // 不能选择父元素
        $(target).attr('contentEditable', false);
        _insertimg(e.target.outerHTML)
    }
});


function _insertimg(str) {
    var selection = window.getSelection ? window.getSelection() : document.selection;
    document.getElementById('edit').focus();
    if (lastEditRange) {
        // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
        selection.removeAllRanges()
        selection.addRange(lastEditRange)
    }
    var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
    if (!window.getSelection) {
        var selection = window.getSelection ? window.getSelection() : document.selection;
        var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        range.pasteHTML(str);
        range.collapse(false);
        range.select();
    } else {
        var hasR = range.createContextualFragment(str);
        var hasR_lastChild = hasR.lastChild;
        while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
            var e = hasR_lastChild;
            hasR_lastChild = hasR_lastChild.previousSibling;
            hasR.removeChild(e)
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
            range.setEndAfter(hasR_lastChild);
            range.setStartAfter(hasR_lastChild);
        }
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range)
    }
    // 无论如何都要记录最后光标对象
    lastEditRange = selection.getRangeAt(0)
}
// 隐藏
$(document).on('click', function() {
    var target = $('.emoji-content-select');
    if (!target.hasClass('select-display')) {
        target.addClass('select-display');
    }
});


$('.commit-btn').on('click', function () {
    // console.log('div---->', $('#edit').html())
    var textM = $('#edit').html();
    var html = textM.replace(/<span\s*[^>]*>(.*?)<\/span>/g, function ($1, $2) {
        var el = document.createElement('div');
        $(el).html($1);
        var emoji = $(el).children('span').attr('class').substr(-4);
        console.log('class--->', emoji);
        var num1 = parseInt(emoji, 16);
        return '&#' + num1 + ';';
    });
    console.log('html---->', html);
    var text = html.replace(/(<br>)?(<\/div>)?<div>/g, '\\n') // 空行 表情结尾行 表情行
        .replace(/(<br>)|(<div>)/g, '\\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/(<br>)?<\/div>$/, '');
    console.log('res--->', text)
})

