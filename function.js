var timeoutResize;
var timeoutScreenOrientationChange;
var timeoutWindowOrientationChange;
var support = {
    'windowScreenOrientation': false,
    'windowDeviceOrientation': false,
    'windowOrientation': false,
    'windowMatchMedia': false
};

window.addEventListener('load', BodyInit);

/**
 * DOM 物件完成讀取後的事件
 */
function BodyInit(){
    if (window.screen.orientation){
        window.screen.orientation.addEventListener('change', ScreenOrientationChange);
        support.windowScreenOrientation = true;
    }
    else{
        document.getElementById('fireScreenOrientationChange').querySelector('td').textContent = 'Screen API: orientationchange event not supported';
        document.getElementById('screenOrientationType').textContent = 'not supported'
    }
    window.addEventListener('resize', WindowResize);

    if (window.DeviceOrientationEvent){
        window.addEventListener('deviceorientation', WindowDeviceOrientation);
        support.windowDeviceOrientation = true;
    }
    else{
        document.getElementById('trDeviceOrientationEventAlpha').className = 'hidden';
        document.getElementById('trDeviceOrientationEventBeta').className = 'hidden';
        document.getElementById('trDeviceOrientationEventGamma').className = 'hidden';
        document.getElementById('fireWindowDeviceOrientation').querySelector('td').textContent = 'DeviceOrientationEvent API not supported'
    }

    if (window.orientation !== undefined){
        window.addEventListener('orientationchange', WindowOrientationChange);
        support.windowOrientation = true;
    }
    else{
        document.getElementById('trWindowOrientation').className = 'hidden';
        document.getElementById('fireWindowOrientationChange').className = 'hidden';
    }

    if (window.matchMedia){
        support.windowMatchMedia = true;
    }
    else{
        document.getElementById('windowMatchMediaPortrait').textContent = 'not supported';
        document.getElementById('windowMatchMediaLandscape').textContent = 'not supported';
    }
    Refresh();
}

/**
 * 縮放視窗的事件
 */
function WindowResize(){
    document.getElementById('fireWindowResize').className = 'fire';
    // 若有等待中的 setTimeout，清除掉，後面再建立，等於一直延後
    if (timeoutResize){
        window.clearTimeout(timeoutResize);
        timeoutResize = undefined;
    }

    timeoutResize = window.setTimeout(function(){
        document.getElementById('fireWindowResize').className = '';
    }, 100);

    Refresh();
}

/**
 * 旋轉裝置的事件
 */
function ScreenOrientationChange(){
    document.getElementById('fireScreenOrientationChange').className = 'fire';
    // 若有等待中的 setTimeout，清除掉，後面再建立，等於一直延後
    if (timeoutScreenOrientationChange){
        window.clearTimeout(timeoutScreenOrientationChange);
        timeoutScreenOrientationChange = undefined;
    }

    timeoutScreenOrientationChange = window.setTimeout(function(){
        document.getElementById('fireScreenOrientationChange').className = '';
    }, 100);

    Refresh();
}

/**
 * 棄用的旋轉裝置的事件
 */
function WindowOrientationChange(){
    document.getElementById('fireWindowOrientationChange').className = 'fire';
    // 若有等待中的 setTimeout，清除掉，後面再建立，等於一直延後
    if (timeoutWindowOrientationChange){
        window.clearTimeout(timeoutWindowOrientationChange);
        timeoutWindowOrientationChange = undefined;
    }

    timeoutWindowOrientationChange = window.setTimeout(function(){
        document.getElementById('fireWindowOrientationChange').className = '';
    }, 100);

    Refresh();
}

/**
 * 傾斜裝置的事件
 * @param {DeviceOrientationEvent} event 事件
 */
function WindowDeviceOrientation(event){
    if (!support.windowDeviceOrientation){
        return;
    }
    document.getElementById('deviceOrientationEventAlpha').textContent = getValue(event.alpha);
    document.getElementById('deviceOrientationEventBeta').textContent = getValue(event.beta);
    document.getElementById('deviceOrientationEventGamma').textContent = getValue(event.gamma);
}

/**
 * 更新各項目的數值
 */
function Refresh(){
    document.getElementById('navigatorUserAgent').textContent = window.navigator.userAgent;
    if (support.windowOrientation){
        document.getElementById('windowOrientation').textContent = getValue(window.orientation);
    }

    if (support.windowScreenOrientation){
        document.getElementById('screenOrientationType').textContent = getValue(window.screen.orientation.type);
    }
    if (support.windowMatchMedia){
        document.getElementById('windowMatchMediaPortrait').textContent = (window.matchMedia('(orientation: portrait)').matches) ? 'true' : 'false';
        document.getElementById('windowMatchMediaLandscape').textContent = (window.matchMedia('(orientation: landscape)').matches) ? 'true' : 'false';
    }
    document.getElementById('screenWidth').textContent = window.screen.width;
    document.getElementById('screenHeight').textContent = window.screen.height;
    document.getElementById('screenAvailWidth').textContent = window.screen.availWidth;
    document.getElementById('screenAvailHeight').textContent = window.screen.availHeight;
    document.getElementById('windowInnerWidth').textContent = window.innerWidth;
    document.getElementById('windowInnerHeight').textContent = window.innerHeight;
    document.getElementById('windowOuterWidth').textContent = window.outerWidth;
    document.getElementById('windowOuterHeight').textContent = window.outerHeight;
    document.getElementById('documentClientWidth').textContent = document.documentElement.clientWidth;
    document.getElementById('documentClientHeight').textContent = document.documentElement.clientHeight;
    document.getElementById('screenColorDepth').textContent = window.screen.colorDepth;
    document.getElementById('screenPixelDepth').textContent = window.screen.pixelDepth;
    document.getElementById('windowDevicePixelRatio').textContent = window.devicePixelRatio;
}

/**
 * 取得字串結果
 * @param {any} value 值
 * @returns 字串結果
 */
function getValue(value){
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'string'){
        if (value.length === 0){
            return 'empty string';
        }
        return value;
    }
    return `?(${(typeof value)})`;
}