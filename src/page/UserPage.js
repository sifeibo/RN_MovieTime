import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import BackPress from '../common/BackPress'
import Ionicons  from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import {connect} from 'react-redux'
import actions from '../action/index'  

import InformItem from '../common/InformItem'
import NavigationUtil from '../navigator/NavigationUtil';
import { px } from '../util/device';

const themeColor = '#476'
class UserPage extends Component{
  constructor(props){
    super(props);
    this.state={
      username: '',
      signature: '',
      password: ''
    }
    this.backPress = new BackPress({backPress: () => this.onBackPress()});
  }
 
  // 装载监听
  componentDidMount(){
    this.backPress.componentDidMount();
    const {userInfo} = this.props.login
    this.setState({
      username: userInfo.username,
      signature: userInfo.signature,
      password: userInfo.password
    })
  }
  // 卸载监听
  componentWillUnmount(){
    this.backPress.componentWillUnmount();
  }
  // 监听props改变发出通知
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.login.tag !== this.props.login.tag){
      Alert.alert(
        '系统通知',
        nextProps.login.msg1,
        [
          {text: 'OK', onPress: () => {
            if(nextProps.login.msg1 === '修改成功'){
              NavigationUtil.goBack(this.props.navigation);
              // if (this.props.navigation.state.params.callback) {
              //   this.props.navigation.state.params.callback()
              // }
            }
          }},
        ],
        { cancelable: false }
        )
    }
  }
  // 处理 Android 中的物理返回键
  onBackPress (){
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  getLeftButton(){
    return (<TouchableOpacity style={{position: 'absolute',left: 20,width:50,height:50, justifyContent:'center'}} 
    onPress={() => {NavigationUtil.goBack(this.props.navigation)}}>
      <Ionicons 
      name = {'ios-arrow-back'}
      size = {28}
      style={{color: 'white'}}/>
   </TouchableOpacity>)
  }
  getrightButton(){
    return (<TouchableOpacity style={{position: 'absolute',right:10,top:1,width:50,height:50,justifyContent:'center',alignItems:'center'}} 
    onPress={() => {
      // 上传至服务器，并且引发userInfo的更新
      let userInfo = this.props.login.userInfo;
      userInfo.username = this.state.username,
      userInfo.signature = this.state.signature,
      userInfo.password = this.state.password
      this.props.onChangeUser(userInfo)
      }}>
      <Text style={{color:'white',fontSize:16}}>保存</Text>
   </TouchableOpacity>)
  }

  render(){
    let statusBar={
      backgroundColor: this.props.themeColor,
      barStyle: 'light-content',
      hidden: false,
    }
    let navigationBar = <NavigationBar
      statusBar = {statusBar}
      titleView = {<Text ellipsizeMode='tail' numberOfLines={1} style={{color: 'white', fontSize: 20}}>编辑资料</Text>}
      style = {{backgroundColor: this.props.themeColor}}
      leftButton = {this.getLeftButton()}
      rightButton = {this.getrightButton()}
    />

    return (
      <View style={styles.container}>
        {navigationBar}
        <InformItem holisticStyle={{marginTop: px(40)}} frontTag='头像' editable = {false}/>
        <InformItem  frontTag='昵称' onChangeText={username => this.setState({username})} value={this.state.username} />
        <InformItem  frontTag='签名' onChangeText={signature => this.setState({signature})} value={this.state.signature}/>
        <InformItem  frontTag='密码' secureTextEntry={true} onChangeText={password => this.setState({password})} value={this.state.password} />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  login: state.login,
  themeColor: state.theme.themeColor
});

const mapDispatchToProps = dispatch => ({
  onChangeUser: (userInfo) => dispatch(actions.onChangeUser(userInfo))
});
export default  connect(mapStateToProps,mapDispatchToProps)(UserPage);



const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderColor: '#d3d3d3',
    },

});


