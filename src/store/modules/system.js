import { computed, action, extendObservable } from 'mobx'
import remotedev from 'mobx-remotedev'
import { Dimensions } from 'react-native'
// import MobXDebugger from '../../plugins/MobXDebugger';
// todo remotedev在react-native debugger无效

// @MobXDebugger({
//   name: 'System',
// })
@remotedev({
    name: 'System',
})
class System {
    constructor() {
        extendObservable(this, {
            currentView: 'none',
            deviceWidth: 0,
            deviceHeight: 0,
        })
    }

    @computed
    get deviceDimension() {
        return {
            width: this.deviceWidth,
            height: this.deviceHeight,
        }
    }

    @action
    update() {
        this.deviceWidth = Math.round(Dimensions.get('window').width)
        this.deviceHeight = Math.round(Dimensions.get('window').height)
    }
}

export default System
