/**
 * 收藏相关的reducer汇总
 */
import Types from '../../action/types'

// 设置初始state 为青色
const defaultState={
    tag: 0
}

export default function onAction(state = defaultState, action){
    switch(action.type){
        case Types.COLLECT_ACTION:
            return{
                ...state,
                tag: action.tag
            }
        default:
            return state
    }

}