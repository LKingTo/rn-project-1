import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { inject, observer } from 'mobx-react'
import viewUtils from '../../utils/viewUtils'
import Screen from '../Screen'
import WLoading from '../../components/WLoading/WLoading'
import WIcon from '../../iconfont/WIcon'
import IconUp from '../../iconfont/IconUp'

@inject('store')
@observer
export default class TestScreen extends Screen {
    constructor(props) {
        super(props)
        console.log('props', props)
        this.store = this.props.store
        this.state = {
            loading: false
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#285040' }}>
                <View style={styles.container}>
                    <Text>Test Screen</Text>
                    <Text>store.system: {JSON.stringify(this.store.system)}</Text>
                    <Button
                        title="update store.system"
                        onPress={() => this.store.system.update()} />
                    <Button
                        title="viewUtils: alert"
                        onPress={() => viewUtils.alert('Alert', 'this is a alert')} />
                    <Button
                        title="viewUtils: confirm"
                        onPress={() => viewUtils.confirm('Confirm', 'this is a confirm')} />
                    <Button
                        title="viewUtils: toast"
                        onPress={() => viewUtils.toast('this is a toast')} />
                    <Button
                        title="WLoading"
                        onPress={() => {
                            const loading = this.state.loading
                            this.setState({ loading: !loading })
                        }} />
                    {this.state.loading ? <WLoading text={'正在加载...'} /> : null}
                    <View style={{ flexDirection: 'row', flewWrap: 'warp' }}>
                        <WIcon name="jia" size={20} />
                        <WIcon name="right" color="green" size={30} />
                        <WIcon name="left" color={['green', 'orange']} size={30} />
                        <WIcon name="up" />
                        <WIcon name="down" />
                        <WIcon name="bianji" />
                        <WIcon name="chenggong" />
                        <WIcon name="fenxiang" />
                        <WIcon name="dianzan" />
                        <WIcon name="jianshao" />
                        <IconUp color="orange" />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // justifyContent: 'center',
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
