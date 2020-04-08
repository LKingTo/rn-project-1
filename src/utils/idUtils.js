const UUID_CHARS_BANK = 'abcdefghijklmnopqrstuvwxyz0123456789'
const UUID_NUMBER_CHARS_BANK = '0123456789'

/**
 * 用于产生指定长度的随机 UUID
 * 或者产生标准格式的 RFC4122 UUID
 * 标准格式为：xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 * 按照规定，N 那个位置，只会是8，9，a，b
 * M 那个位置，代表版本号，由于 UUID 的标准实现有5个版本，所以只会是1，2，3，4，5
 * 这里是基于随机数产生的 UUID，所以属于版本 4
 * 资料可参考：http://www.jianshu.com/p/d77f3ef0868a
 * @param length [UUID长度]
 * @param onlyNumber [是否全为数字]
 * @return {string}
 */
export function uuid(length, onlyNumber) {
    const chars = onlyNumber
        ? UUID_NUMBER_CHARS_BANK.split('')
        : UUID_CHARS_BANK.split('')
    const radix = chars.length
    let uuid = []
    // 如果指定长度，则产生指定长度的 UUID
    if (length) {
        for (let i = 0; i < length; i++) {
            uuid[i] = chars[0 | (Math.random() * radix)]
        }
    } else {
    // 否则的话，就产生标准格式的 UUID
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                let r = 0 | (Math.random() * 16)
                uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r].toUpperCase()
            }
        }
    }
    return uuid.join('')
}
