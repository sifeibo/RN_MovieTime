import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {connect} from 'react-redux'

import HotPage from '../page/HotPage'
import TrendingPage from '../page/TrendingPage'
import MyPage from '../page/MyPage'
import LovePage from '../page/LovePage'
import NavigationUtil from './NavigationUtil';

// 底部导航
const TABS = {
    HotPage: {
    // 必须填写的路由配置信息
      screen: HotPage,
      // 设置标题栏相应属性
      navigationOptions: {
        tabBarLabel:'火热',
        tabBarIcon:({tintColor,focused})=>(
             <FontAwesome5 
             name={'hotjar'}
             size={24}
             style={{color: tintColor}}/>
        )
    }
    },
    LovePage: {
      screen: LovePage,
      navigationOptions: {
        tabBarLabel:'收藏',
        tabBarIcon:({tintColor,focused})=>(
          <AntDesign 
          name={'heart'}
          size={23}
          style={{color: tintColor}}/>
        )
      }
    },  
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
          tabBarLabel:'趋势',
          tabBarIcon:({tintColor,focused})=>(
            <Entypo
            name={'user'}
            size={25}
            style={{color: tintColor}}/>
          )
      }
    },
    MyPage: {
      screen: MyPage,
      navigationOptions: {
        tabBarLabel:'我的',
        tabBarIcon:({tintColor,focused})=>(
          <Entypo
          name={'user'}
          size={25}
          style={{color: tintColor}}/>
        )
    }
    }
  };
  
// 动态修改底部导航栏颜色
class TabBarComponent extends React.Component{
    constructor(props){
        super(props);
        // this.theme={
        //     tintColor: props.activeTintColor,
        //     updateTime: new Date().getTime()
        // }
    }
    render(){
        /*  未使用redux之前
        const { routes, index } = this.props.navigation.state;
        // console.log(routes[index].params)
        if(routes[index].params){
            const {theme} = routes[index].params;
            // 以最新的时间为主, 防止被其他tab之前的修改覆盖
            if (theme && theme.updateTime > this.theme.updateTime){
                this.theme = theme;
            }
        }*/

        // 子组件使用了{...this.props}后，就可以拿到父组件中的属性
        return <BottomTabBar {...this.props} 
            activeTintColor={this.props.themeColor}/>
    
    }
}

class DynamicTabNavigator extends React.Component{
    constructor(props){
        super(props);
        // 隐藏黄色警告文件
        console.disableYellowBox = true;
    }
    _tabNavigator(){
        const {HotPage, LovePage,TrendingPage, MyPage} = TABS;
        // 这里就可以根据需要显示想要显示的tab 其他可以隐藏
        const tabs = {HotPage, LovePage, MyPage}
        HotPage.navigationOptions.tabBarLabel = '最热'; //动态配置属性
        // 如果存在就不要重新创建
        if(!this.tabNavigator){
            this.tabNavigator =createAppContainer(createBottomTabNavigator(
                tabs,{
                    tabBarComponent: props=>{
                      return <TabBarComponent themeColor={this.props.themeColor} {...props}/>
                    }
                }))
        }
        return this.tabNavigator;
      }
      render(){
        const Tab = this._tabNavigator();
        return <Tab />
    }
}

const mapStateToProps = state =>{
  return {
    themeColor: state.theme.themeColor,
  }
}

export default connect(mapStateToProps)(DynamicTabNavigator);