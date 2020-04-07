import React from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import PropTypes from 'prop-types'

export default class WActivityIndicator extends React.Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number
    }

    static defaultProps = {
        size: 18,
        color: '#3C64E6'
    }

    render() {
        let { color, size, ...props } = this.props
        if (Platform.OS === 'ios') {
            // ios不能设置具体数值
            size = size > 30 ? 'large' : 'small'
        }
        return <ActivityIndicator color={color} size={size} {...props} />
    }
}
