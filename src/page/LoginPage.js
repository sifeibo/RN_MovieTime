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
import AsyncStorage from '@react-native-community/async-storage';        

import NavigationUtil from '../navigator/NavigationUtil';
import { px } from '../util/device';

const themeColor = '#476'
class LoginPage extends Component{
  constructor(props){
    super(props);
    this.state={
      name: '',
      password: ''
    }
    this.backPress = new BackPress({backPress: () => this.onBackPress()});
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
  // 装载监听
  componentDidMount(){
    this.backPress.componentDidMount();
  }
  // 卸载监听
  componentWillUnmount(){
    this.backPress.componentWillUnmount();
  }
  // 处理 Android 中的物理返回键
  onBackPress (){
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  login(){
    console.log('登录',this.state.name,this.state.password)
    // 解决axios的post格式问题，原格式为application/json，传递json字符串：{"name":"123","password":"123"}
    // 而我需要传递application/x-www-form-urlencoded格式，类似 key-value的格式
    // 1. 使用formData 去创建数据，传递的自然就是formData格式
    // let formData = new FormData()
    // formData.append('name',this.state.name)
    // formData.append('password',this.state.password)
    axios({method: 'post',
      url: 'http://192.168.43.62:9999/login/', 
      // data: formData,
      // 2. 增加transformRequest方法在发送post数据之前改变数据格式
      data:{
        name: this.state.name,
        password: this.state.password
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    })
    .then(response =>{
      console.log(response);
      // AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
      let tag = response.data.msg;
      Alert.alert(
        '系统通知',
        tag,
        [
          {text: 'OK', onPress: () => {
            if(tag === '登录成功'){
              NavigationUtil.goBack(this.props.navigation);
            }
          }},
        ],
        { cancelable: false }
        )
    })
    .catch(error =>{
      console.log(error);
    });
    
  }
  register(){
    console.log('注册')
    console.log(this.state.name)
  }
  render(){
    let statusBar={
      backgroundColor: themeColor,
      barStyle: 'light-content',
      hidden: false,
    }
    let navigationBar = <NavigationBar
      statusBar = {statusBar}
      style = {{backgroundColor: themeColor}}
      leftButton = {this.getLeftButton()}
    />
    return (
      <View style={styles.container}>
        {navigationBar}
        <View style={styles.loginView}>
          <Text>欢迎登陆</Text>
          <TextInput  placeholder="手机号/邮箱" onChangeText={name => this.setState({name})} value={this.state.name}/>
          <TextInput  numberOfLines={1} placeholder="密码" secureTextEntry={true} onChangeText={password => this.setState({password})} value={this.state.password} />
          <Button onPress={this.login.bind(this)} color={themeColor} title="登录"/>
          <Button onPress={this.register.bind(this)} color={themeColor} title="注册"/>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    loginView:{
      paddingLeft: px(32),
      paddingRight: px(32)
    }

});

export default LoginPage;
