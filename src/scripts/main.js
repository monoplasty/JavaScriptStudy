var leftPos =
    typeof window.screenLeft == 'number' ? window.screenLeft : window.screenX;
var topPos =
    typeof window.screenTop == 'number' ? window.screenTop : window.screenY;
console.log('-----------------window Object---------------------');
console.log('left-->', leftPos);
console.log('top-->', topPos);
console.log('window.screenTop--->', window.screenTop);
console.log('window.screenY--->', window.screenY);

setTimeout(() => {
    console.log('---------move----------');
    window.moveBy(0, 200); // 两个方法可能会被浏览器禁用
}, 5000);

console.log('-----------------viewport size---------------------');
var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;

if (typeof pageWidth != 'number') {
    if (document.compatMode == 'CSS1Compat') {
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}
console.log('pageWidth-->', pageWidth);
console.log('pageHeight-->', pageHeight);

console.log('-----------------window open---------------------');
setTimeout(() => {
    // window.open('http://www.wrox.com/', 'topFrame');
    // var wroWin = window.open("http://www.wrox.com/", "wroxWindow", "height=400,width=400,top=10,left=10,resizable=yes");

    console.log('window.open_:D:):(:3__>');
}, 5000);

console.log('-----------------window location---------------------');


console.log('UA-->', navigator.userAgent);

// 检测浏览器引擎
var client = function () {
    var engine = {
        // 呈现引擎
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        ver: null,
    }
    var browser = {
        // 浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,

        ver: null,
    }
    var ua = navigator.userAgent;
    if (window.opera) {
        engine.ver = browser.ver =  window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if(/AppleWebKit\/(\S+)/.test(ua)){
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);

        // 确定是 chrome 还是 Safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
        } else {
            // 近似地确定版本号
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }

            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua)||/Konqueror\/([^;]+)/.test(ua)) { 
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);        

        // 确定是不是 Firefox
        if (/Firefox\/(S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.ie = parseFloat(engine.ver);
    }
    return {
        engine: engine,
        browser: browser,
    }
}();

// 识别浏览器
var clientBrowser = function () {
    var engine = {

    }
}()
