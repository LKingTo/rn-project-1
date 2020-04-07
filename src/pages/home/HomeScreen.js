import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { inject, observer } from 'mobx-react'
import Screen from '../Screen'
import { EVENT_GLOBAL } from '../../constants/event'

@inject('store')
@observer
export default class HomeScreen extends Screen {
    constructor(props) {
        super(props)
        console.log('props', props)
        this.store = this.props.store
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#285040' }}>
                <View style={styles.container}>
                    <Text>Home Screen</Text>
                    <Text>store: {JSON.stringify(this.store)}</Text>
                    <Button title="$emit event to Mine" onPress={() => this.$emit(EVENT_GLOBAL, { msg: 'msg from Home to Mine' })} />
                </View>
            </SafeAreaView>
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
