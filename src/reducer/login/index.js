/**
 * login相关的reducer汇总
 */
import Types from '../../action/types'


const defaultState={
    userInfo: null,
    msg: null
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
        default:
            return state
    }

}