import Types from '../types'

/**
 * 改变主题颜色
 * @param {*} themeColor 
 */
export function onThemeChangeColor(themeColor){
    return {
        type: Types.THEME_CHANGECOLOR,
        themeColor: themeColor
    }
}