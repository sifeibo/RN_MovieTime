import React from 'react';
import {BackHandler} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'


import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'


class HomePage extends React.Component{
  // 装载监听
  componentDidMount(){
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  // 卸载监听
  componentWillUnmount(){
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  // 处理 Android 中的物理返回键
  onBackPress = () =>{
    // nav是自定义的初始reducer
    const {dispatch, nav} = this.props;
    // RootNavigator中InitNavigator的index为0;MainNavigator导航器的index为1
    if (nav.routes[1].index === 0){
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }


  render(){
    // 在加入底部导航栏之前 提取出Home页和子页面的导航
    NavigationUtil.navigation = this.props.navigation;
    
    return <DynamicTabNavigator />
}
}

// 订阅nav
const mapStateToProps = state =>({
  nav: state.nav
});

export default connect(mapStateToProps)(HomePage);