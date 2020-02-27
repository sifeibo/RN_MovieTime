import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

class MyPage extends React.Component{
  getRightButton(){
    return <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => {

      }}>
        <View style={{padding: 5,marginRight: 8}}>
            <Feather 
            name={'search'}
            size={24}
            style={{color: 'white'}}
            />
        </View>
      </TouchableOpacity>
    </View>
  }
  getLeftButton(callBack){
    return <TouchableOpacity style={{padding: 8,paddingLeft:12}} onPress={callBack}>
      <Ionicons 
        name = {'ios-arrow-back'}
        size = {26}
        style={{color: 'white'}}/>
    </TouchableOpacity>
  }
  render(){
    let statusBar={
      backgroundColor: '#476',
      barStyle: 'light-content',
      hidden: false
    }
    let navigationBar = <NavigationBar
      title={'我的收藏'}
      statusBar = {statusBar}
      style = {{backgroundColor: '#476'}}
      rightButton = {this.getRightButton()}
      leftButton = {this.getLeftButton()}
    />
    return (
      <View style={styles.container}>
          {navigationBar}
          <Text style={styles.welcome}>MyPage</Text>
          <Text onPress={()=>{
            NavigationUtil.movePage({navigation: this.props.navigation},'DataStoreDemo')
          }}>跳转到离线缓存框架</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    welcome:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

export default MyPage;
