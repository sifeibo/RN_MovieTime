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
import EvilIcons  from 'react-native-vector-icons/EvilIcons'
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios';
import {connect} from 'react-redux'

import actions from '../action/index'   
import NavigationUtil from '../navigator/NavigationUtil';
import { px } from '../util/device';

const themeColor = '#476'
class LoginPage extends Component{
  constructor(props){
    super(props);
    this.state={
      name: '',
      password: '',
    }
    this.backPress = new BackPress({backPress: () => this.onBackPress()});
  }
  getLeftButton(){
    return (<TouchableOpacity style={{position: 'absolute',left: 15,width:50,height:50, justifyContent:'center'}} 
    onPress={() => {NavigationUtil.goBack(this.props.navigation)}}>
      <EvilIcons 
      name = {'close'}
      size = {28}
      style={{color: 'black'}}/>
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
  // 监听props改变发出通知
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.login.msg !== this.props.login.msg){
      Alert.alert(
        '系统通知',
        nextProps.login.msg,
        [
          {text: 'OK', onPress: () => {
            if(nextProps.login.msg === '登录成功'){
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
  // login(){
  //   // console.log('登录',this.state.name,this.state.password)
  //   // 解决axios的post格式问题，原格式为application/json，传递json字符串：{"name":"123","password":"123"}
  //   // 而我需要传递application/x-www-form-urlencoded格式，类似 key-value的格式
  //   // 1. 使用formData 去创建数据，传递的自然就是formData格式
  //   // let formData = new FormData()
  //   // formData.append('name',this.state.name)
  //   // formData.append('password',this.state.password)
  //   axios({method: 'post',
  //     url: 'http://192.168.43.62:9999/login/', 
  //     // data: formData,
  //     // 2. 增加transformRequest方法在发送post数据之前改变数据格式
  //     data:{
  //       name: this.state.name,
  //       password: this.state.password
  //     },
  //     transformRequest: [function (data) {
  //       let ret = ''
  //       for (let it in data) {
  //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //       }
  //       return ret
  //     }],
  //     headers: {'content-type': 'application/x-www-form-urlencoded'},
  //   })
  //   .then(response =>{
  //     // console.log(response);
  //     // 存入本地数据库
  //     // AsyncStorage.setItem('userInfo', JSON.stringify(response.data.data))
  //     // 存入全局变量
  //     global.data.userInfo = response.data.data;
  //     // 调用回调函数
  //     let tag = response.data.msg;
  //     Alert.alert(
  //       '系统通知',
  //       tag,
  //       [
  //         {text: 'OK', onPress: () => {
  //           if(tag === '登录成功'){
  //             NavigationUtil.goBack(this.props.navigation);
  //             if (this.props.navigation.state.params.callback) {
  //               this.props.navigation.state.params.callback()
  //             }
  //           }
  //         }},
  //       ],
  //       { cancelable: false }
  //       )
  //   })
  //   .catch(error =>{
  //     console.log(error);
  //   });
    
  // }
  login(){
    const {onLogin} = this.props;
    onLogin(this.state.name, this.state.password)
  }
  register(){
    let obj = {
      name: this.state.name,
      password: this.state.password,
      username: '新用户'
    }
    obj = JSON.stringify(obj)
    axios({method: 'post',
      url: 'http://192.168.43.62:9999/createUser/', 
      // data: formData,
      // 2. 增加transformRequest方法在发送post数据之前改变数据格式
      data:{obj: obj},
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
      let tag = response.data.msg;
      Alert.alert(
        '系统通知',
        tag,
        [
          {text: 'OK', onPress: () => {
            // if(tag === '注册成功'){
            //   NavigationUtil.goBack(this.props.navigation);
            // }
          }},
        ],
        { cancelable: false }
        )
    })
    .catch(error =>{
      console.log(error);
    });
  }
  alert(){
    if(this.props.login.msg !==null){
      Alert.alert(
        '系统通知',
        this.props.login.msg,
        [
          {text: 'OK', onPress: () => {
            if(this.props.login.msg === '登录成功'){
              NavigationUtil.goBack(this.props.navigation);
            }
          }},
        ],
        { cancelable: false }
      )
    }
  }
  render(){
    let statusBar={
      backgroundColor: this.props.themeColor,
      barStyle: 'dark-content',
      hidden: false,
    }
    let navigationBar = <NavigationBar
      statusBar = {statusBar}
      style = {{backgroundColor: 'white'}}
      leftButton = {this.getLeftButton()}
    />
    return (
      <View style={styles.container}>
        {navigationBar}
        <View style={styles.loginView}>
          <Text style={styles.title}>欢迎登陆</Text>
          <TextInput style={styles.input1} placeholder="手机号/邮箱" onChangeText={name => this.setState({name})} value={this.state.name}/>
          <TextInput style={styles.input2} numberOfLines={1} placeholder="密码" secureTextEntry={true} onChangeText={password => this.setState({password})} value={this.state.password} />
          <View style={styles.Button}>
            <Button  onPress={this.login.bind(this)} color={this.props.themeColor}  title="登录"/>
          </View>
          <View style={styles.Button}>
            <Button onPress={this.register.bind(this)} color={this.props.themeColor}  title="注册"/>
          </View>
        </View>
      </View>
    );
  }
};


const mapStateToProps = state => ({
  login: state.login,
  themeColor: state.theme.themeColor
});

const mapDispatchToProps = dispatch => ({
  //将 dispatch(onLogin(name, password))绑定到props
  onLogin: (name,password) => dispatch(actions.onLogin(name, password))
});
export default  connect(mapStateToProps,mapDispatchToProps)(LoginPage);


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white'
    },
    loginView:{
      paddingLeft: px(32),
      paddingRight: px(32)
    },
    title:{
      marginTop: px(80),
      marginBottom: px(80),
      textAlign: "center",
      fontSize: px(50),
      fontWeight:"bold"
    },
    Button:{
      marginTop: px(20),
    },
    input1:{
      borderWidth: px(1),
      borderColor:'gray',
      borderRadius: px(4),
    },
    input2:{
      borderBottomWidth: px(1),
      borderLeftWidth: px(1),
      borderRightWidth: px(1),
      borderColor:'gray',
      borderRadius: px(4),
    }

});


