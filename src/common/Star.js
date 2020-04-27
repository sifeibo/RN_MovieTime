import React,{Component} from 'react'
import {ViewPropTypes, StatusBar, View, Text,StyleSheet, Platform} from 'react-native'
import {PropTypes} from 'prop-types'
import { px } from '../util/device';
import Entypo from 'react-native-vector-icons/Entypo';


export default class Star extends Component{
    // 提供属性类型检查
    static propTypes = {
        value: PropTypes.number,
        size: PropTypes.number,
        margin: PropTypes.number,
        max: PropTypes.number,
        color: PropTypes.string,
        fontColor: PropTypes.string,
    };
    // 设置默认属性
    static defaultProps = {
        value: 0.0,
        size: 20,
        margin: 5,
        max: 5,
        color: '#FF8C00',
        fontColor: 'white'
    }
    render(){
        const { size, margin, max, color, value, fontColor} = this.props;
        let value1 = value
        let value2 = value/2
        if (value1 === 0){
            value1 = 0.0
        }
        const defaultStars = [], activeStars = [];
        for (let i = 0; i < max; i++) {
            // 渲染灰色星星
            defaultStars.push(<Entypo name='star-outlined' key={i} size={size} color='#ececec'  style={{ marginRight: margin }}/>)
        }
        for (let i = 0; i < value1 / 2 ; i++) {
            // 渲染黄色星星
            activeStars.push(<Entypo name='star' key={i} size={size} color={color}  style={{ marginRight: margin }}/>)
        }
         // 选中状态的星星的宽度
         const activeStarsWidth = (size + margin) * Math.floor(value2) + size * (value2 - Math.floor(value2));
        return(
            <View style={[styles.container,this.props.style]}>
                <View style={styles.rate}>
                    <View style={[styles.stars, styles.active, { width: activeStarsWidth }]}>
                        {activeStars.map(item => item)}
                    </View>
                    <View style={styles.stars}>
                        {defaultStars.map(item => item)}
                    </View>
                </View>
             <Text style={[styles.value,{color: fontColor}]}>{value1}</Text>
            </View>
        )
    }
    
}



const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
    },
    rate: {
        flexDirection: 'row',
        alignItems:'center',
        position: 'relative',
        marginRight: px(10)
    },
    stars: {
        flexDirection: 'row',
        overflow: 'hidden',
        flexGrow: 0,
    },
    active: {
        position: 'absolute',
        zIndex: 200,
        left: 0,
    },
    value:{
        color: 'white',
        fontSize: px(27),
    }
})