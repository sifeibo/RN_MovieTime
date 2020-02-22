import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import NavigationUtil from '../navigator/NavigationUtil'


class WelcomePage extends React.Component{
  componentDidMount(){
    this.timer = setTimeout(()=>{
      NavigationUtil.resetToHomePage({
        navigation: this.props.navigation
      })
    },2000);
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
