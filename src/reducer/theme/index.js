/**
 * 主题相关的reducer汇总
 */
import ThemeFactory, {ThemeFlags} from "../../res/ThemeFactory";
import Types from '../../action/types'

// 设置初始state 为青色
const defaultState={
    // themeColor: ThemeFactory.createTheme(ThemeFlags.Default),
    themeColor:ThemeFlags.Default,
    onShowCustomThemeView: false,
}

export default function onAction(state = defaultState, action){
    switch(action.type){
        case Types.THEME_CHANGECOLOR:
            return{
                ...state,
                themeColor: action.themeColor
            }
        case Types.SHOW_THEME_VIEW:
            return {
                ...state,
                customThemeViewVisible: action.customThemeViewVisible,
            };
        default:
            return state
    }

}