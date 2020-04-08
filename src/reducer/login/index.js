/**
 * login相关的reducer汇总
 */
import Types from '../../action/types'


const defaultState={
    userInfo: null,
    msg: null,
    msg1: null,
    tag: 0
}

export default function onAction(state = defaultState, action){
    switch(action.type){
        case Types.LOGIN_SUCCESS: 
            return {
                ...state,
                userInfo: action.userInfo,
                msg: action.msg
            }
        case Types.LOGIN_FAIL: 
            return{
                ...state,
                msg: action.msg
            }
        case Types.LOGIN_NETFAIL: 
            return{
                ...state,
                msg: action.msg
            }

        case Types.CHANGE_SUCCESS: 

            return {
                ...state,
                userInfo: action.userInfo,
                tag: action.tag,
                msg1: action.msg1
            }
        case Types.CHANGE_FAIL: 
            return{
                ...state,
                tag: action.tag,
                msg1: action.msg1
            }
        case Types.CHANGE_NETFAIL: 
            return{
                ...state,
                tag: action.tag,
                msg1: action.msg1
            }
        default:
            return state
    }

}