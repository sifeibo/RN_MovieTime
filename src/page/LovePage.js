import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action/index'



class LovePage extends React.Component{
  render(){
    const {navigation} = this.props;
    // console.log('tab的导航', navigation);
    return (
      <View style={styles.container}>
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

const mapStateToProps = state =>({});
const mapDispatchToProps = dispatch =>({
  onThemeChangeColor: themeColor=>dispatch(actions.onThemeChangeColor(themeColor))
});
export default connect(mapStateToProps, mapDispatchToProps)(LovePage);
