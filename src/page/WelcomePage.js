import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import NavigationUtil from '../navigator/NavigationUtil'
import SplashScreen from 'react-native-splash-screen'


class WelcomePage extends React.Component{
  componentDidMount(){
    // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
    this.timer = setTimeout(()=>{
      SplashScreen.hide();
      NavigationUtil.resetToHomePage({
        navigation: this.props.navigation
      })
    },200);
    
  }
  componentWillUnmount(){
    this.timer && clearTimeout(this.timer);
  }
  render(){
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>WelcomePage</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

export default WelcomePage;
