import React from 'react';
import {BackHandler} from 'react-native'
 
 
export default class BackPress{
    constructor(props){
        this._hardwareBackPress = this.onHardwareBackPress.bind(this);
        this.props = props;
    }
        // 装载监听
    componentDidMount(){
        if (this.props.backPress) BackHandler.addEventListener("hardwareBackPress", this._hardwareBackPress)
    }
    // 卸载监听
    componentWillUnmount(){
        if (this.props.backPress) BackHandler.removeEventListener("hardwareBackPress", this._hardwareBackPress);
    }
    onHardwareBackPress(e){
        return this.props.backPress(e);
    }
}
  
