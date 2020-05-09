/**
 *  根action，导出所有action方法
 */
import {onThemeChangeColor, onShowCustomThemeView, onThemeInit} from './theme'
import {onLoadHotData, onLoadMoreHotData} from './hot'
import {onLogin, onChangeUser} from './login'
import {onCollectionAction} from './collection'


export default{
    onThemeChangeColor,
    onShowCustomThemeView, 
    onThemeInit,
    onLoadHotData,
    onLoadMoreHotData,
    onLogin,
    onCollectionAction,
    onChangeUser
}