import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';


class MyPage extends React.Component{
  render(){
    return (
      <View style={styles.container}>
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

export default MyPage;
