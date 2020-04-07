import { Alert, ToastAndroid } from 'react-native'
import { isAndroid, isIos, isString } from './utils'
import Orientation from 'react-native-orientation'
import Toast from 'react-native-root-toast'

const DEFAULT_OK_TEXT = '确定'
const DEFAULT_CANCEL_TEXT = '取消'

/**
 * alert 弹框，点击ok后返回resolve。
 * android activity pause后，alert的显示可能会有问题
 * @param title
 * @param [message]
 * @param [okText]
 * @param [cancelable]
 * @returns {Promise<void>}
 */
export async function alert(title, message = ' ', okText = DEFAULT_OK_TEXT, cancelable = false) {
    return new Promise((resolve, reject) => {
        if (!isString(title)) {
            title = title + ''
        }
        if (!isString(message)) {
            message = message + ''
        }
        Alert.alert(title, message, [{ text: okText, onPress: () => resolve() }], {
            cancelable: cancelable
        })
    })
}

/**
 * confirm弹框
 * @param title
 * @param [message]
 * @param [okText]
 * @param [cancelText]
 * @param [cancelable]
 * @returns {Promise<boolean>} 点击确定按钮返回true，取消按钮返回false
 */
export async function confirm(
    title,
    message = '',
    okText = DEFAULT_OK_TEXT,
    cancelText = DEFAULT_CANCEL_TEXT,
    cancelable = false
) {
    return new Promise((resolve, reject) => {
        Alert.alert(
            title,
            message,
            [
                { text: cancelText, onPress: () => resolve(false), style: 'cancel' },
                { text: okText, onPress: () => resolve(true) }
            ],
            { cancelable: cancelable }
        )
    })
}

/**
 * toast 显示
 * @param message
 * @param [duration] 显示延时， 默认2000
 * @returns {Promise<void>}
 */
export async function toast(message, duration = 2000) {
    let toastInstance = Toast.show(message, {
        duration: duration,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    })
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // toast也会主动隐藏
            // Toast.hide(toast)
            resolve()
        }, duration)
    })
}

export const ORIENTATION_LANDSCAPE = 'LANDSCAPE'
export const ORIENTATION_PORTRAIT = 'PORTRAIT'

/**
 * 设置屏幕横屏，android和ios横屏方向不一样，需要区别对待。
 * 横屏后home键在右手边。
 */
export function lockToLandscape() {
    if (isAndroid()) {
        Orientation.lockToLandscapeLeft()
    } else if (isIos()) {
        Orientation.lockToLandscapeRight()
    }
}

/**
 * 弹框常用方法，将Alert转换成promise接口返回。
 * 方法归集成模块，方便统一按模块方式调用。
 */
const viewUtils = {
    alert,
    confirm,
    toast,
    ORIENTATION_LANDSCAPE,
    ORIENTATION_PORTRAIT,
    lockToLandscape
}

export default viewUtils
