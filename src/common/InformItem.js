import React,{Component} from 'react'
import {View, Text,StyleSheet, TextInput, ViewPropTypes} from 'react-native'
import {PropTypes} from 'prop-types'
import { px } from '../util/device';
import Entypo from 'react-native-vector-icons/Entypo';

// 设置输入框所接受的属性
const textInputShape = {
    numberOfLines: PropTypes.string,
    onChangeText: PropTypes.string,
    value: PropTypes.string,
}

export default class InformItem extends Component{
    // 提供属性类型检查
    static propTypes = {
        frontTag: PropTypes.string,
        holisticStyle: ViewPropTypes.style,
    };
    // 设置默认属性
    static defaultProps = {
        frontTag: '示例示例'
    }
    render(){
        return(
           <View style={[styles.container, this.props.holisticStyle]}>
               <View style={{width: px(150)}}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.frontTag}>{this.props.frontTag}</Text>
               </View>
               <TextInput style={styles.textInput} {...this.props}/>
               <Entypo name = {'chevron-small-right'} size = {px(50)} style={{color: 'grey'}}/>
           </View>
        )
    }
    
}



const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flexDirection: "row",
        alignItems:'center',
        paddingLeft: px(32),
        paddingRight: px(10)
    },
    frontTag:{
        color: 'black', 
        fontSize: px(31), 
        fontWeight: 'bold',
    },
    textInput:{
        flex: 1,
        marginLeft: px(20),
    }

})