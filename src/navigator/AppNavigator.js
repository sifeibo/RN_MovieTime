import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import MovieDetailPage from '../page/MovieDetailPage'
import LoginPage from '../page/LoginPage'
import {connect} from 'react-redux'
import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers'

// 设置根路由
export const rootCom = 'Init';

// 初始化welcome跳转Home导航器
const InitNavigator = createStackNavigator({
    WelcomePage:{
        screen: WelcomePage,
        navigationOptions:{
            headerShown: false //可以通过这个属性禁用stack的bar
        }
    }
})
// 主导航器
const MainNavigator = createStackNavigator({
    HomePage:{
        screen: HomePage,
        navigationOptions:{
            headerShown: false, //可以通过这个属性禁用stack的bar
        }
    },
    MovieDetailPage:{
        screen: MovieDetailPage,
        navigationOptions:{
            headerShown: false, //可以通过这个属性禁用stack的bar
        }
    },LoginPage:{
        screen: LoginPage,
        navigationOptions:{
            headerShown: false, //可以通过这个属性禁用stack的ba
        }
    }
})
//总导航器
export const RootNavigator =  createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
   
}, {initialRouteName: 'Init',
    navigationOptions:{
        headerShown: false //可以通过这个属性禁用stack的bar
    }
}
))

/** 在Navigation中引入redux
 * 1. 初始化react-navigation与redux的中间件
 * 此方法最大的作用就是为了createReduxContainer的key设置actionSubscribers（行为订阅者）
*/
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
  );

/** 在Navigation中引入redux
 * 2. 将总导航器组件传递给createReduxContainer方法
 * 并且返回一个将navigation state和dispatch函数作为props的新组件
 * 注意： 要在createReactNavigationReduxMiddleware后执行
*/
const App = createReduxContainer(RootNavigator);

// state到props的映射关系
const mapStateToProps = (state) => ({
  state: state.nav,
});

/**
 * 3. 通过connect连接react 组件与redux store
 */
export default connect(mapStateToProps)(App)