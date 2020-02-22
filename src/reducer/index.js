import { combineReducers } from 'redux'
import {rootCom, RootNavigator} from '../navigator/AppNavigator'
import theme from './theme'
import hot from './hot'


// 1. 指定默认的state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

// 2. 创建自己的 navigation reducer
const navReducer = (state = navState, action) =>{
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果‘nextState’为null或者未定义，只需要返回原始‘state’
    return nextState || state;
}

// 3. 合并reducer
const index = combineReducers({
    nav: navReducer,
    theme: theme,
    hot: hot,
});

export default index;