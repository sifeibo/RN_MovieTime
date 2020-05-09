import Types from '../types'
import ThemeDao from "../../expand/localdb/ThemeDao"

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


/**
 * 初始化主题
 * @returns {Function}
 */
export function onThemeInit() {
    return dispatch => {
        new ThemeDao().getTheme().then((data) => {
            dispatch(onThemeChangeColor(data.themeColor))
        })
    }
}

/**
 * 显示自定义主题浮层
 * @param show
 * @returns {{type: *, customThemeViewVisible: *}}
 */
export function onShowCustomThemeView(show) {
    return {type: Types.SHOW_THEME_VIEW, customThemeViewVisible: show};
}

