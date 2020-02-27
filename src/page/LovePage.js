import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action/index'
import NavigationBar from '../common/NavigationBar'



class LovePage extends React.Component{
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
    />
    const {navigation} = this.props;
    // console.log('tab的导航', navigation);
    return (
      <View style={styles.container}>
        {navigationBar}
          <Text style={styles.welcome}>LovePage</Text>
          <Button  title='改变主题颜色'
            onPress={()=>{
              console.log(this.props)
              this.props.onThemeChangeColor('red')
            }}
          />
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

const mapStateToProps = state =>({});
const mapDispatchToProps = dispatch =>({
  onThemeChangeColor: themeColor=>dispatch(actions.onThemeChangeColor(themeColor))
});
export default connect(mapStateToProps, mapDispatchToProps)(LovePage);
