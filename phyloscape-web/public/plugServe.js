
// JS对象深度合并
function deepMerge(target = {}, source = {}) {
    target = deepClone(target);//深度克隆
    if (typeof target !== 'object' || typeof source !== 'object') return false;//判断类型
    for (let prop in source) {
        if (!source.hasOwnProperty(prop)) continue; //检测属性是否为对象的自有属性
        if (prop in target) { //prop 中是否有 target 属性
            if (typeof target[prop] !== 'object') {
                target[prop] = source[prop];
            } else {
                if (typeof source[prop] !== 'object') {
                    target[prop] = source[prop];
                } else {
                    if (target[prop].concat && source[prop].concat) {
                        target[prop] = target[prop].concat(source[prop]); //合并
                    } else {
                        target[prop] = deepMerge(target[prop], source[prop]);//递归
                    }
                }
            }
        } else {
            target[prop] = source[prop];
        }
    }
    return target;
};
// 深度克隆
function deepClone (obj) {
    // 对常见的“非”值，直接返回原来值
    if([null, undefined, NaN, false].includes(obj)) return obj;
    if(typeof obj !== "object" && typeof obj !== 'function') {
        //原始类型直接返回
        return obj;
    }
    var o = isArray(obj) ? [] : {};
    for(let i in obj) {
        if(obj.hasOwnProperty(i)){
            o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
        }
    }
    return o;
}
 
function isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

const weblogic = {
    // relatKeys: [],
    structure: null,
    version: "v1.0.0",
    deepMerge,
    init: function (data) {
        weblogic.structure = data || null;
        return weblogic;
    },
    getConfig: function (key) {
        if (!window.frameElement) return {};
        key = key || window.frameElement.getAttribute('iframe-id');
        if (window.parent.plugMessage) return window.parent.getPlugInit(key) || {};
    },
    getOption: function () {
        let config = weblogic.getConfig();
        return config.option || {};
    },
    setMessage: function (data) {
        let config = weblogic.getConfig();
        if (window.parent.plugMessage) window.parent.plugMessage('onMessage', { relatKeys: config.relatKeys, data })
    },
    setCreated: function (data) {
        let config = weblogic.getConfig();
        if (window.parent.plugMessage) window.parent.plugMessage('onCreated', { relatKeys: config.relatKeys, data })
    },
    setMounted: function (data) {
        let config = weblogic.getConfig();
        if (window.parent.plugMessage) window.parent.plugMessage('onMounted', { relatKeys: config.relatKeys, data })
    },
    // setLoading: function (data) {
    //     let config = weblogic.getConfig();
    //     if (window.parent.plugMessage) window.parent.plugMessage('onLoading', { relatKeys: config.relatKeys, data })
    // },
    setCustom: function (data) {
        let config = weblogic.getConfig();
        if (window.parent.plugMessage) window.parent.plugMessage('onCustom', { relatKeys: config.relatKeys, data })
    },
    setload: function (data) {
        let config = weblogic.getConfig();
        if (window.parent.plugMessage) window.parent.plugMessage('onload', { relatKeys: config.relatKeys, data })
    },
    setUnmount: function (data) {
        let config = weblogic.getConfig();
        if (window.parent.plugMessage) window.parent.plugMessage('onUnmount', { relatKeys: config.relatKeys, data })

    },
    onContent: () => { },
    onOption: () => { },
    onCustom: () => { },
    onConfig: () => { },
};
window.onContent = function (content, config) {
    weblogic.config = { ...weblogic.config, ...config };
    weblogic.onContent(content, config);
}
window.onOption = function (option) {
    if ((typeof option == 'string') && str.constructor == String) {
        throw new Error(`The 'option' parameter does not exist！`);
    };

    let config = weblogic.getConfig();
    weblogic.onOption({ ...config.option, ...option });
}
window.onCustom = function (data) {
    // weblogic.onCustom = weblogic.onCustom(data);
    weblogic.onCustom(data);
}
window.onConfig = function (data) {
    weblogic.onConfig(data);
}
window.weblogic = weblogic;
// export default weblogic;