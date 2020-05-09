import React from 'react';
import {View} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'


import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import BackPress from '../common/BackPress'
import CustomTheme from '../page/CustomTheme';
import actions from '../action'


class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.backPress = new BackPress({backPress: this.onBackPress()});
  }
  // 装载监听
  componentDidMount(){
    this.backPress.componentDidMount();
    SplashScreen.hide();
  }
  // 卸载监听
  componentWillUnmount(){
    this.backPress.componentWillUnmount();
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
  renderCustomThemeView() {
    const {customThemeViewVisible, onShowCustomThemeView} = this.props;
    return (<CustomTheme
        visible={customThemeViewVisible}
        {...this.props}
        onClose={() => onShowCustomThemeView(false)}
    />)
}

  render(){
    // 在加入底部导航栏之前 提取出Home页和子页面的导航
    NavigationUtil.navigation = this.props.navigation;
    return <View style={{flex: 1}}>
          <DynamicTabNavigator />
          {this.renderCustomThemeView()}
        </View>;
    
}
}

// 订阅nav
const mapStateToProps = state => ({
  nav: state.nav,
  customThemeViewVisible: state.theme.customThemeViewVisible,
  theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
  onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);