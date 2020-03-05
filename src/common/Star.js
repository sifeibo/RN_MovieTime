import React,{Component} from 'react'
import {ViewPropTypes, StatusBar, View, Text,StyleSheet, Platform} from 'react-native'
import {PropTypes} from 'prop-types'



export default class Star extends Component{
    // 提供属性类型检查
    static propTypes = {
        // 接受图片url数组
        imgs: PropTypes.array
    };
    // 设置默认属性
    static defaultProps = {
        statusBar:{
            barStyle: 'light-content',
            hidden: false
        }
    }
    render(){
        return(
            <View style={styles.container}>

            </View>
        )
    }
    
}



const styles = StyleSheet.create({
   

})