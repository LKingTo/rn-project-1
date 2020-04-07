import { Platform } from 'react-native'

/**
 * 判断是否 iOS
 * @return {boolean}
 */
export function isIos() {
    return Platform.OS === 'ios'
}

/**
 * 判断是否 Android
 * @return {boolean}
 */
export function isAndroid() {
    return Platform.OS === 'android'
}

/**
 * 判断是否开发模式(debug)
 * @returns {boolean}
 */
export function isDebugMode() {
    // eslint-disable-next-line no-undef
    return !!__DEV__
}

/**
 * 将state属性读写代理到组件this对象上。
 * 由于setState可能是异步更改state数据的，这里初始化了一个内部私有数据，
 * 用于缓存state属性值，即读取getter返回的值是缓存值。
 * 注意该代理方式未验证所有场景的准确性，请确定后再慎用!!!，
 * 否则请遵循官方教程使用setState() 。
 * 复杂页面，或注重性能场景，请使用 mobx store。
 * @param component
 * @param state
 */
export function proxyState(component, state) {
    const originalFunc = component.setState
    for (const propName in state) {
        if (state.hasOwnProperty(propName)) {
            proxyStateProp(component, state, propName, originalFunc)
        }
    }
    const updateCacheData = function(data) {
        for (const propName in data) {
            if (data.hasOwnProperty(propName)) {
                const cachePropName = '_' + propName
                component[cachePropName] = data[propName]
            }
        }
    }
    // 代理 setState 方法
    component.setState = function(updater, callback) {
        const args = Array.from(arguments)
        if (updater) {
            if (isObject(updater)) {
                updateCacheData(updater)
            } else if (isFunction(updater)) {
                args[0] = (prevState, props) => {
                    const data = updater.call(component, prevState, props)
                    updateCacheData(data)
                    return data
                }
            }
        }
        return originalFunc.apply(component, args)
    }
}

function proxyStateProp(component, state, propName, originalSetState) {
    const cachePropName = '_' + propName
    component[cachePropName] = state[propName]
    Object.defineProperty(component, propName, {
        enumerable: true,
        configurable: true,
        get: () => {
            // return component.state[propName]
            return component[cachePropName]
        },
        set: val => {
            const obj = {}
            obj[propName] = val
            component[cachePropName] = val
            originalSetState.call(component, obj)
        }
    })
}

/**
 * 将指定对象中的方法this固定绑定为对象自己，方便component中使用。
 * 等于执行多个 this[methodName] = this[methodName].bind(this)
 * @param methods
 * @param thisObj
 */
export function bindThis(methods, thisObj) {
    for (const methodName in methods) {
        if (methods.hasOwnProperty(methodName)) {
            thisObj[methodName] = (methods[methodName] || thisObj[methodName]).bind(thisObj)
        }
    }
}

/**
 * 判断是否字符串
 * @param val
 * @return {boolean}
 */
export function isString(val) {
    return typeof val === 'string' && val.constructor === String
}

/**
 * 判断是否数值
 * @param val
 * @return {boolean}
 */
export function isNumber(val) {
    return typeof val === 'number' && val.constructor === Number
}

/**
 * 判断是否
 * @param val
 * @return {boolean}
 */
export function isFunction(val) {
    return typeof val === 'function' && val.constructor === Function
}

/**
 * 判断是否是 undefined
 * @param val
 * @return {boolean}
 */
export function isUndefined(val) {
    return typeof val === 'undefined'
}

/**
 * 判断指定值是否 Object 类型，且排除 null 值
 * @param val
 * @return {boolean}
 */
export function isObject(val) {
    return val !== null && typeof val === 'object'
}

/**
 * URL 格式化，将 URL 中的 {key} 替换成对应变量
 * @param url
 * @param map
 * @return String
 */
export function formatUrl(url, map) {
    map = map || {}
    return url.replace(/{(\w+)}/g, (match, key) => {
        let value = map[key]
        return typeof value !== 'undefined' ? encodeURIComponent(value + '') : match
    })
}

/**
 * 判断是否包含 HTML 标签
 * @param content
 * @return {boolean|*}
 */
export function hasHtml(content) {
    return (
        isString(content) &&
        (content.includes('<html>') ||
            content.includes('<html ') ||
            content.includes('<body>') ||
            content.includes('<body ') ||
            content.includes('<div>'))
    )
}

/**
 * 显式转换成字符串，null和undefined将转换成空字符串，避免"undefined"问题。
 * @param str
 */
export function convertToString(str) {
    if (!isString(str)) {
        if (str === undefined || str === null) {
            return ''
        } else {
            return str + ''
        }
    }
    return str
}

/**
 * 解析json字符串为js对象, 默认解析失败不抛出异常
 */
export function parseJSON(str, throwErrorIfFail = false) {
    if (str == null) {
        return null
    } else if (!isString(str)) {
        return str
    }
    try {
        return JSON.parse(str)
    } catch (e) {
        if (throwErrorIfFail) {
            throw e
        } else {
            return null
        }
    }
}

/**
 * 判断是否用户可读的消息内容
 * @param str
 * @returns {boolean}
 */
export function isMessageString(str) {
    const matched = str && isString(str) && str.length >= 4 && str.length < 50
    // 不能太短,也不能太长, 太长的话可能是html
    if (!matched) {
        return false
    }
    const hasHtml =
        str.indexOf('<html>') >= 0 ||
        str.indexOf('<html ') >= 0 ||
        str.indexOf('<body>') >= 0 ||
        str.indexOf('<body ') >= 0 ||
        str.indexOf('<div>') >= 0
    if (hasHtml) {
        return false
    }
    const hasChinese = !!str.match(/[\u4e00-\u9fa5]/)
    if (!hasChinese) {
        return false
    }
    // 没有中文字词, 也不是用户可见消息
    return true
}

/**
 * 比较两个版本号大小, 比如5.3.3, 5.1.0
 * @param v1
 * @param v2
 * @returns {number}   0 相等， 1表示v1大于v2， -1表示v1小于v2，NaN错误版本格式
 */
export function compareVersion(v1, v2) {
    v1 = v1 || ''
    v2 = v2 || ''
    const v1parts = v1.split('.')
    const v2parts = v2.split('.')

    function isPositiveInteger(x) {
        // http://stackoverflow.com/a/1019526/11236
        return /^\d+$/.test(x)
    }

    // First, validate both numbers are true version numbers
    function validateParts(parts) {
        for (let i = 0; i < parts.length; ++i) {
            if (!isPositiveInteger(parts[i])) {
                return false
            }
        }
        return true
    }

    if (!validateParts(v1parts) || !validateParts(v2parts)) {
        return NaN
    }

    for (let i = 0; i < v1parts.length; ++i) {
        if (v2parts.length === i) {
            return 1
        }
        const num1 = parseInt(v1parts[i], 10)
        const num2 = parseInt(v2parts[i], 10)
        if (num1 > num2) {
            return 1
        } else if (num1 < num2) {
            return -1
        }
    }

    if (v1parts.length !== v2parts.length) {
        return -1
    }
    return 0
}
