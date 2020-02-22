/**
 * 主题相关的reducer汇总
 */
import Types from '../../action/types'

// 设置初始state 为青色
const defaultState={
    themeColor: '#476'
}

export default function onAction(state = defaultState, action){
    switch(action.type){
        case Types.THEME_CHANGECOLOR:
            return{
                ...state,
                themeColor: action.themeColor
            }
        default:
            return state
    }

}