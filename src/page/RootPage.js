import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto'
import NavigationBar from '../common/NavigationBar'


class RootPage extends React.Component{  
    getRightButton(){
        return (<TouchableOpacity style={{position: 'absolute',bottom: -27,right: 15,width:50,height:50,justifyContent:"center",alignItems:'center'}} 
        onPress={() => {}}>
               <Fontisto 
               name={'search'}
               size={20}
               style={{color: 'black'}}
               />
       </TouchableOpacity>)
    }
  render(){
    let statusBar={
        backgroundColor: 'white',
        barStyle: 'dark-content',
        hidden: false
      }
   
    let navigationBar = <NavigationBar
        statusBar = {statusBar}
        titleView = {<Text ellipsizeMode='head' numberOfLines={1} style={{color: 'black', fontSize: 21}}>首页</Text>}
        titleLayoutStyle = {{
        alignItems:'flex-start',
        justifyContent: 'center',
        position:'absolute',
        left: 15,
        top: 0,
        bottom: 0}}
        rightButton = {this.getRightButton()}
        style = {{backgroundColor: 'white'}}
    />
    return (
      <View style={styles.container}>
          {navigationBar}
          <View style={styles.lunBo}></View>
          <View style={styles.movieView}></View>
          <View style={styles.movieView}></View>
          <View style={styles.bangDan}></View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    welcome:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

export default  RootPage;
