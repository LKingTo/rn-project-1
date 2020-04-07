import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { inject, observer } from 'mobx-react'

import Screen from '../Screen'

@inject('store')
@observer
export default class TestScreen extends Screen {
    constructor(props) {
        super(props)
        console.log('props', props)
        this.store = this.props.store
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Test Screen</Text>
                <Text>store.system: {JSON.stringify(this.store.system)}</Text>
                <Button
                    title="update store.system"
                    onPress={() => this.store.system.update()} />
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
