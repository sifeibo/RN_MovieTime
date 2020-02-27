import React,{Component} from 'react'
import {ViewPropTypes, StatusBar, View, Text,StyleSheet, Platform} from 'react-native'
import {PropTypes} from 'prop-types'

const NAV_BAR_HEIGHT_IOS = 44; //标题栏高度
const NAV_BAR_HEIGHT_ANDROID = 50; //标题栏高度
const STATUS_BAR_HEIGHT = 20; //状态栏高度
// 设置状态栏所接受的属性
const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
    translucent:  PropTypes.bool,
}
export default class NavigationBar extends Component{
    // 提供属性类型检查
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
    };
    // 设置默认属性
    static defaultProps = {
        statusBar:{
            barStyle: 'light-content',
            hidden: false
        }
    }
    render(){
        // 状态栏样式
        let statusBar = this.props.statusBar.hidden ?null:
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar}/>
            </View>;
        // 判断标题是否有自己的样式，没有则显示标题
        let titleView = this.props.titleView ? this.props.titleView :
        <Text ellipsizeMode='head' numberOfLines={1} style={styles.title}>{this.props.title}</Text>;

        // 合体样式
        let content = this.props.hide ? null : 
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>;
        return(
            <View style={[styles.container,this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }
    getButtonElement(data){
        return (
            <View style={styles.navBarButton}>
                {data?data:null}
            </View>
        )
    }
}



const styles = StyleSheet.create({
    navBarButton:{
        alignItems: 'center',
    },
    navBar:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios'? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID

    },
    navBarTitleContainer:{
        alignItems:'center',
        justifyContent: 'center',
        position:'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    container:{
        // backgroundColor:'#476'
    },
    title:{
        fontSize: 20,
        color: 'white'
    },
    statusBar:{
        height: STATUS_BAR_HEIGHT
    }

})