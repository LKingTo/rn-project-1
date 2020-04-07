import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import WActivityIndicator from '../WActivityIndicator/WActivityIndicator'

export default class WLoading extends React.PureComponent {
    render() {
        const { text } = this.props
        return (
            <View style={styles.container}>
                <WActivityIndicator size={35} />
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 10,
        color: '#999'
    }
})
