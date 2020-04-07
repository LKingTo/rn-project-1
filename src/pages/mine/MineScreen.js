import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import Screen from '../Screen'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
export default class MineScreen extends Screen {
    constructor(props) {
        super(props)
        console.log(props)
        this.store = this.props.store
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Mine Screen</Text>
                <Text>Store: {JSON.stringify(this.store)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    buttonTabsBox: {
        width: '100%',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E1E1E1',
    },
    contentBox: {
        width: '100%',
        flex: 1,
    },
})
