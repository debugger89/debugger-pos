import { Store } from 'pullstate'
const { Map } = require('immutable')

export const UIStore = new Store({
    isDarkMode: true,
    tabList: [],
    currentTabKey: '',
    saleContent: Map({}),
})
