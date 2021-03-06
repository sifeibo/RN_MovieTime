import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons  from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {connect} from 'react-redux'
import NavigationUtil from '../navigator/NavigationUtil';
import { px } from '../util/device';
import actions from '../action/index'
import AsyncStorage from '@react-native-community/async-storage'; 
    

class MyPage extends Component{
  constructor(props){
    super(props);
  }
  userinfo(userInfo){
    console.log(userInfo)
    if(userInfo === null){
      return (<TouchableOpacity style={[styles.headView,{backgroundColor: this.props.themeColor}]} onPress={()=>{NavigationUtil.movePage({},'LoginPage')}}>
        {/* onPress={()=>{NavigationUtil.movePage({callback: (()=>{this.setState({userInfo: global.data.userInfo})})},'LoginPage')}}> */}
      <Image 
        style={styles.userImg}
      />
      <Text  style={styles.userName} >登录</Text>
      <Text  style={styles.movieNub} >登录后可以进行更多操作哦！</Text>
      <Entypo name = {'chevron-small-right'} size = {35} style={{color: 'white', position:'absolute', right: 10, top:30}}/>
    </TouchableOpacity>
    )}else{
      return(<TouchableOpacity style={[styles.headView,{backgroundColor: this.props.themeColor}]} onPress={()=>{NavigationUtil.movePage({},'UserPage')}}>
      <Image 
        style={styles.userImg}
        source={{uri: userInfo.userimg}}
        />
      <Text  style={styles.userName} >{userInfo.username}</Text>
      <Text  style={styles.movieNub} >查看个人主页 / 编辑资料</Text>
      <Entypo name = {'chevron-small-right'} size = {35} style={{color: 'white', position:'absolute', right: 10, top:30}}/>
    </TouchableOpacity>)
    }
  }
  render(){
    let statusBar={
      backgroundColor: this.props.themeColor,
      barStyle: 'light-content',
      hidden: false
    }
    let navigationBar = <NavigationBar
      title={'我的'}
      statusBar = {statusBar}
      style = {{backgroundColor: this.props.themeColor}}
    />
    let userInfo = this.props.login.userInfo
    return (
      <View style={styles.container}>
          {navigationBar}
          {this.userinfo(userInfo)}

          <View  style={styles.bottomView}>
            <TouchableOpacity style={[styles.itemView]} onPress={()=>{NavigationUtil.movePage({},'DataStoreDemo')}}>
              <MaterialCommunityIcons name={'star-face'} size={30} style={{color: this.props.themeColor}} />
              <Text style={styles.itemFont}>我的收藏</Text>
              <Entypo name = {'chevron-small-right'} size = {25} style={{color: 'black', position:'absolute', right: 15,}}/>
            </TouchableOpacity>
          </View>

          <View  style={styles.bottomView}>
            <TouchableOpacity style={styles.itemView} onPress={()=>{this.props.onShowCustomThemeView(true)}}>
              <Ionicons name={'ios-color-wand'} size={30} style={{color: this.props.themeColor}} />
              <Text style={styles.itemFont}>改变主题</Text>
              <Entypo name = {'chevron-small-right'} size = {25} style={{color: 'black', position:'absolute', right: 15,}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemView}>
              <MaterialCommunityIcons name={'update'} size={30} style={{color: this.props.themeColor}} />
              <Text style={styles.itemFont}>版本更新</Text>
              <Entypo name = {'chevron-small-right'} size = {25} style={{color: 'black', position:'absolute', right: 15,}}/>
            </TouchableOpacity>
          </View>

          <View  style={styles.bottomView}>
            <TouchableOpacity style={styles.itemView}>
              <AntDesign name={'github'} size={28} style={{color: this.props.themeColor}} />
              <Text style={styles.itemFont}>项目地址</Text>
              <Entypo name = {'chevron-small-right'} size = {25} style={{color: 'black', position:'absolute', right: 15,}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemView}>
              <MaterialCommunityIcons name={'blogger'} size={30} style={{color: this.props.themeColor}} />
              <Text style={styles.itemFont}>我的博客</Text>
              <Entypo name = {'chevron-small-right'} size = {25} style={{color: 'black', position:'absolute', right: 15,}}/>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white'
    },
    // 顶部用户信息
    headView:{
      height: px(210),
      flexDirection: 'row',
      alignItems: 'center',
      // borderColor: 'black',
      // borderWidth:1,
      paddingLeft: 15
    },
    userImg:{
      width: px(140),
      height: px(140),
      borderRadius: px(80),
      borderWidth:2,
      borderColor: 'white'
    },
    userName:{
      color: 'white',
      fontSize: px(39),
      position:'absolute',
      top: 20,
      left: 100
    },
    movieNub:{
      color: 'white',
      fontSize: px(27),
      position:'absolute',
      top: 60,
      left: 100
    },

    // 底部
    bottomView:{
      borderColor: '#d3d3d3',
      borderTopWidth: 10,
      paddingLeft: 15,
    },
    itemView:{
      flexDirection:'row',
      alignItems: 'center',
      height: px(110),
      borderColor: '#d3d3d3',
      borderBottomWidth: 0.2,
    },
    itemFont:{
      position:'absolute', 
      left: 55,
      fontSize: 15,
      fontWeight: 'bold',

    }

});

const mapStateToProps = state => ({
  login: state.login,
  themeColor: state.theme.themeColor
});
const mapDispatchToProps = dispatch =>({
  onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show))
});
export default connect(mapStateToProps,mapDispatchToProps)(MyPage);
