var timeoutResize;
var timeoutOrientationChange;

window.addEventListener('load', BodyInit);

/**
 * DOM 物件完成讀取後的事件
 */
function BodyInit(){
    if (window.screen.orientation){
        window.screen.orientation.addEventListener('change', ScreenOrientationChange);
    }
    window.addEventListener('resize', WindowResize);
    window.addEventListener('deviceorientation', WindowDeviceOrientation);
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
    if (timeoutOrientationChange){
        window.clearTimeout(timeoutOrientationChange);
        timeoutOrientationChange = undefined;
    }

    timeoutOrientationChange = window.setTimeout(function(){
        document.getElementById('fireScreenOrientationChange').className = '';
    }, 100);

    Refresh();
}

/**
 * 傾斜裝置的事件
 * @param {DeviceOrientationEvent} event 事件
 */
function WindowDeviceOrientation(event){
    if (!event.alpha && !event.beta && !event.gamma){
        document.getElementById('trDeviceOrientationEventAlpha').className = 'hidden';
        document.getElementById('trDeviceOrientationEventBeta').className = 'hidden';
        document.getElementById('trDeviceOrientationEventGamma').className = 'hidden';
        return;
    }
    document.getElementById('deviceOrientationEventAlpha').textContent = event.alpha;
    document.getElementById('deviceOrientationEventBeta').textContent = event.beta;
    document.getElementById('deviceOrientationEventGamma').textContent = event.gamma;
}

/**
 * 更新各項目的數值
 */
function Refresh(){
    document.getElementById('navigatorUserAgent').textContent = window.navigator.userAgent;
    if (window.orientation){
        document.getElementById('windowOrientation').textContent = window.orientation;
        document.getElementById('trWindowOrientation').className = '';
    }
    else{
        document.getElementById('trWindowOrientation').className = 'hidden';
    }
    if (window.screen.orientation){
        document.getElementById('screenOrientationType').textContent = window.screen.orientation.type;
    }
    document.getElementById('windowMatchMediaPortrait').textContent = (window.matchMedia('(orientation: portrait)').matches) ? 'true' : 'false';
    document.getElementById('windowMatchMediaLandscape').textContent = (window.matchMedia('(orientation: landscape)').matches) ? 'true' : 'false';
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