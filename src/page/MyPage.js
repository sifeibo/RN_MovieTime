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

import ViewUtil from '../util/ViewUtil';
import NavigationUtil from '../navigator/NavigationUtil'

class MyPage extends Component{
  constructor(props){
    super(props);
    this.state={
      user:{
        userimage: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3819550809,2703379148&fm=111&gp=0.jpg',
        username: '苦茶丶',
        movienub: '15',
      },
    }
  }
  render(){
    let statusBar={
      backgroundColor: '#476',
      barStyle: 'light-content',
      hidden: false
    }
    let navigationBar = <NavigationBar
      title={'我的'}
      statusBar = {statusBar}
      style = {{backgroundColor: '#476'}}
    />
    return (
      <View style={styles.container}>
          {navigationBar}
          <TouchableOpacity style={styles.headView} onPress={()=>{NavigationUtil.movePage({},'DataStoreDemo')}}>
            <Image 
              style={styles.userImg}
              source={{uri: this.state.user.userimage}}/>
            <Text  style={styles.userName} >{this.state.user.username}</Text>
            <Text  style={styles.movieNub} >查看个人主页 / 编辑资料</Text>
            <Entypo name = {'chevron-small-right'} size = {35} style={{color: 'white', position:'absolute', right: 10, top:30}}/>
          </TouchableOpacity>

          <View  style={styles.bottomView}>
            <TouchableOpacity style={[styles.itemView]} onPress={()=>{NavigationUtil.movePage({},'DataStoreDemo')}}>
              <MaterialCommunityIcons name={'star-face'} size={30} style={{color: '#476'}} />
              <Text style={styles.itemFont}>我的收藏</Text>
              <Entypo name = {'chevron-small-right'} size = {25} style={{color: 'black', position:'absolute', right: 15,}}/>
            </TouchableOpacity>
          </View>

          <View  style={styles.bottomView}>
            <TouchableOpacity style={styles.itemView}>
              <Ionicons name={'ios-color-wand'} size={30} style={{color: '#476'}} />
              <Text style={styles.itemFont}>改变主题</Text>
              <Entypo name = {'chevron-small-right'} size = {25} style={{color: 'black', position:'absolute', right: 15,}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemView}>
              <MaterialCommunityIcons name={'update'} size={30} style={{color: '#476'}} />
              <Text style={styles.itemFont}>版本更新</Text>
              <Entypo name = {'chevron-small-right'} size = {25} style={{color: 'black', position:'absolute', right: 15,}}/>
            </TouchableOpacity>
          </View>

          <View  style={styles.bottomView}>
            <TouchableOpacity style={styles.itemView}>
              <AntDesign name={'github'} size={28} style={{color: '#476'}} />
              <Text style={styles.itemFont}>项目地址</Text>
              <Entypo name = {'chevron-small-right'} size = {25} style={{color: 'black', position:'absolute', right: 15,}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemView}>
              <MaterialCommunityIcons name={'blogger'} size={30} style={{color: '#476'}} />
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
    },
    // 顶部用户信息
    headView:{
      height: 100,
      backgroundColor: '#476',
      flexDirection: 'row',
      alignItems: 'center',
      // borderColor: 'black',
      // borderWidth:1,
      paddingLeft: 15
    },
    userImg:{
      width: 70,
      height:70,
      borderRadius: 40,
      borderWidth:2,
      borderColor: 'white'
    },
    userName:{
      color: 'white',
      fontSize: 19,
      position:'absolute',
      top: 20,
      left: 100
    },
    movieNub:{
      color: 'white',
      fontSize: 13,
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
      height: 50,
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

export default MyPage;
