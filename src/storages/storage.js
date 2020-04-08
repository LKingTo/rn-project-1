import { AsyncStorage } from 'react-native'

import * as utils from '../utils/utils'

export default class Storage {
    /**
     * 保存数据到本地存储
     * @param key                   保存的 key
     * @param value                 保存的值
     * @param timeoutSeconds        超时, 单位秒, 不指定时则默认永不超时
     * @return {Promise}
     */
    static async setItem(key, value, timeoutSeconds) {
        if (!key) {
            return false
        }
        if (utils.isUndefined(value)) {
            value = null // 避免 undefined 情况
        }
        let data = { value }
        if (timeoutSeconds && utils.isNumber(timeoutSeconds)) {
            data.expires = new Date().getTime() + timeoutSeconds * 1000
        }
        await AsyncStorage.setItem(key, JSON.stringify(data))
        return true
    }

    /**
     * 从本地存储读取数据
     * @param key
     * @return {Promise}
     */
    static async getItem(key) {
        if (!key) {
            return null
        }
        let data = await AsyncStorage.getItem(key)
        if (data === null) {
            return null
        }
        try {
            data = JSON.parse(data)
        } catch (error) {
            console.warn("storage['" + key + "'] is not a json formatted value!")
            return data
        }
        const { value, expires } = data
        const nowTIme = new Date().getTime()
        if (utils.isNumber(expires) && expires > 0 && expires < nowTIme) {
            await AsyncStorage.removeItem(key)
            return null
        }
        return value
    }

    /**
     * 从本地存储删除数据
     * @param key
     * @return {Promise}
     */
    static async removeItem(key) {
        if (!key) {
            return false
        }
        await AsyncStorage.removeItem(key)
        return true
    }
}
