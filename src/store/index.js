import {compose ,applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer/index'
import { middleware } from '../navigator/AppNavigator'
import action from '../action'

// 自定义一个log日志打印中间件
const logger = store=>next=>action=>{
    if(typeof action === 'function'){
        console.log('dispatching a function');
    }else{
        console.log('dispatching', action);
    }
    const result = next(action);
    console.log('nextState', store.getState());
    
};



// 中间件是一个数组
const middlewares = [
    middleware,
    thunk
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
const store = createStore(
    reducers, composeEnhancers(applyMiddleware(...middlewares))
);
// 创建store
export default store;