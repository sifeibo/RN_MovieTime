import React from 'react';
import { TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtil{


    /**
     * 获取左侧返回按钮视图
     * @static
     * @param {*} callBack
     * @memberof ViewUtil
     */
    static getLeftBackButton(callBack){
        return <TouchableOpacity style={{padding: 8, paddingLeft: 12}}
        onPress = {callBack}>
             <Ionicons 
                name = {'ios-arrow-back'}
                size = {26}
                style={{color: 'white'}}/>
        </TouchableOpacity>
    }
}