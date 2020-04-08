import System from './modules/system'
import * as MobX from 'mobx'

class Store {
    constructor() {
        this.system = new System()
    }
}

MobX.configure({
    enforceActions: 'always',
})

export const store = new Store()

export default store
