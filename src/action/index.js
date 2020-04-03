/**
 *  根action，导出所有action方法
 */
import {onThemeChangeColor} from './theme'
import {onLoadHotData, onLoadMoreHotData} from './hot'
import {onLogin} from './login'
import {onCollectionAction} from './collection'


export default{
    onThemeChangeColor,
    onLoadHotData,
    onLoadMoreHotData,
    onLogin,
    onCollectionAction
}