import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from '../navigator/NavigationUtil'
import BackPress from '../common/BackPress'
import Star from '../common/Star'
import { px } from '../util/device';
import LoveDao from '../expand/localdb/LoveDao'


// 获取设备屏幕尺寸，单位 dp
const {width} = Dimensions.get('window')
const PARALLAX_HEADER_HEIGHT = px(510);
const STICKY_HEADER_HEIGHT = 70;
const loveDao = new LoveDao('movie');


const arrToString = function(arr){
    let string = '';
    for(let j = 0,len=arr.length; j < len; j++){
        string += arr[j] + ' '
    }
    return string + '/';
}

export default class HotItem extends React.Component{
    constructor(props){
        super(props);
        this.backPress = new BackPress({backPress: () => this.onBackPress()});
        this.state = {
            isLoveKeys: false,
        }
    }
    componentDidMount(){
        console.log(global.data.userInfo)
        this.backPress.componentDidMount();
        loveDao.getLoveKeys().then((data)=>{
            console.log(data)
        })
        loveDao.isLoveKeys(this.props.id).then((isLoveKeys)=>{
            this.setState({isLoveKeys})
            console.log(isLoveKeys)
        })
    }
    
    // 卸载监听
    componentWillUnmount(){
        this.backPress.componentWillUnmount();
    }
    // 处理 Android 中的物理返回键
    onBackPress(){
        NavigationUtil.goBack(this.props.navigation);
        return true;
    }
    // 渲染演员列表
    getActors(casts){
        let actors = [];
        for(let i=0 , len=casts.length; i < len; i++) {
            if (casts[i].avatars===null){
                actors.push(
                    <View style={styles.actorView} key={i}>
                        <View style={styles.actorImg1}>
                        </View>
                        <Text style={styles.introFont1}>{casts[i].name}</Text>
                    </View>
                ) 
            }else{
                actors.push(
                    <View style={styles.actorView} key={i}>
                        <Image
                        style={styles.actorImg}
                        source={{uri:casts[i].avatars.large}}
                        />
                        <Text style={styles.introFont1}>{casts[i].name}</Text>
                    </View>
                ) 
            }
        }
        return actors;
    }
    // 渲染频道列表
    getTags(tags){
        let tag = [];
        for(let i=0 , len=tags.length; i < len; i++) {
            tag.push(
                <View style={styles.movieTag} key={i}>
                    <Text style={styles.briefIntro}>{tags[i]}</Text>
                    <MaterialIcons
                        name={'keyboard-arrow-right'}
                        size={px(41)}
                        style={{color: 'white',marginTop:px(6.8)}}/>
                </View>
            ) 
        }
        return tag;
    }
    // 渲染头部组装
    getParallaxRenderConfig(data,navigation){
        let config={};
        let introduction = arrToString(data.countries) + arrToString(data.genres) + 
        '上映时间：'+ arrToString(data.pubdates) + '片长：' + arrToString(data.durations)
        // 背景
        config.renderBackground=()=>(
            <View key="background">
            <Image source={{uri: data.photos[0].image,
                            width: width,
                            height: PARALLAX_HEADER_HEIGHT}}/>
            <View style={{position: 'absolute',
                          top: 0,
                          width: width,
                          backgroundColor: 'rgba(0,0,0,.6)',
                          height: PARALLAX_HEADER_HEIGHT}}/>
          </View>
          );
        // 前景
        config.renderForeground=() => (
            <View style={styles.detailHead}>
            <Image
                style={styles.movieImg}
                source={{uri: data.images.large}}
            />
    
            <View style={styles.movieInform}>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.bigTitle}>{data.title}</Text>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.smallTitle}>{data.title}（{data.year}）</Text>
                <Star value={data.rating.average} size={px(26)} margin={px(1)} />
                <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.briefIntro}>{introduction}</Text>
            </View>
            </View>
        );
        // 标题
        config.renderStickyHeader=() =>(
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{data.title}</Text>
            </View>
        );
        // 固定的按钮
        config.renderFixedHeader=() => {
            let isLoveKeys = this.state.isLoveKeys;
            if(isLoveKeys){
                return (  <View key="fixed-header">
                <TouchableOpacity style={{position: 'absolute',bottom: -3,left: 20,width:50,height:50, justifyContent:'center'}} 
                onPress={() => {NavigationUtil.goBack(navigation)}} >
                    <Ionicons 
                        name = {'ios-arrow-back'}
                        size = {28}
                        style={{color: 'white'}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute',bottom: -2,right: 60,width:50,height:50,alignItems:'center',justifyContent:'center'}} 
                onPress={() => {
                    loveDao.moveLoveItem(data.id)
                    
                    this.setState({isLoveKeys: false})    
                }}>
                        <AntDesign 
                        name={'star'}
                        size={24}
                        style={{color: 'white'}}
                        />
                </TouchableOpacity>
                 <TouchableOpacity style={{position: 'absolute',bottom: -2,right: 10,width:50,height:50,alignItems:'center',justifyContent:'center'}} 
                 onPress={() => {}}>
                        <AntDesign 
                        name={'ellipsis1'}
                        size={26}
                        style={{color: 'white'}}
                        />
                </TouchableOpacity>
            </View>)
            }else{
                return (  <View key="fixed-header">
                <TouchableOpacity style={{position: 'absolute',bottom: -3,left: 20,width:50,height:50, justifyContent:'center'}} 
                onPress={() => {NavigationUtil.goBack(navigation)}} >
                    <Ionicons 
                        name = {'ios-arrow-back'}
                        size = {28}
                        style={{color: 'white'}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute',bottom: -2,right: 60,width:50,height:50,alignItems:'center',justifyContent:'center'}} 
                onPress={() => {
                    let value = {
                        movieid: data.id,
                        movieName: data.title,
                        movieImg: data.images.large,
                        movieStar: data.rating.average,
                        movieContent: introduction
                    }
                    loveDao.saveLoveItem(data.id,value)
                    this.setState({isLoveKeys: true})
                    }}>
                        <AntDesign 
                        name={'staro'}
                        size={24}
                        style={{color: 'white'}}
                        />
                </TouchableOpacity>
                 <TouchableOpacity style={{position: 'absolute',bottom: -2,right: 10,width:50,height:50,alignItems:'center',justifyContent:'center'}} 
                 onPress={() => {}}>
                        <AntDesign 
                        name={'ellipsis1'}
                        size={26}
                        style={{color: 'white'}}
                        />
                </TouchableOpacity>
            </View>)
            }
        };
        return config;
    }
    render(){
        const {data, navigation} = this.props;
        const renderConfig = this.getParallaxRenderConfig(data,navigation);
        const tag = this.getTags(data.tags);
        const actors = this.getActors(data.casts);
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                backgroundColor="#476"
                contentBackgroundColor="#476"
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                {...renderConfig}
                >
                {/* 底部 */}
                <View style={styles.detailBottom}> 
                    <Text style={styles.smallTitle1}>所属频道</Text>
                    <ScrollView  showsHorizontalScrollIndicator={false} 
                    horizontal={true} 
                    style={styles.tagView}>
                        {tag}
                    </ScrollView>


                    <Text style={styles.smallTitle1}>简介</Text>
                    <View style={styles.movieIntroduction}>
                        {/* numberOfLines={4} ellipsizeMode={'clip'} */}
                        <Text numberOfLines={4} ellipsizeMode={'clip'} style={styles.introFont}>
                           {data.summary}
                        </Text>
                    </View>


                    <Text style={styles.smallTitle1}>演职员</Text>
                    <ScrollView  showsHorizontalScrollIndicator={false} 
                    horizontal={true} 
                    style={styles.tagView1}>
                        {actors}
                    </ScrollView>

                    <Text style={styles.smallTitle1}>预告片/剧照</Text>
                    
                    <Text style={styles.smallTitle1}>短评</Text>

                </View>
                </ParallaxScrollView>
            </View>   
          )
    }
};


const styles = StyleSheet.create({
   container:{
    flex: 1,
   },
   stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  stickySectionText: {
    color: 'white',
    fontSize: px(40),
    margin: px(20),
  },




   detailHead:{
    flexDirection: 'row',
    marginTop: 80,
    paddingBottom: px(75),
    paddingLeft: px(32)
   },
   movieImg:{
    width: px(210),
    height: px(280),
    borderRadius: 3,
    borderColor:'gray',
   },
   movieInform:{
    flexDirection: 'column',
    marginLeft:  px(25),
    width: width - px(296),
   },
   bigTitle:{
    fontSize: px(42),
    fontWeight: 'bold',
    marginTop: px(8),
    color:'white'
   },
   smallTitle:{
    fontSize: px(34),
    fontWeight: 'bold',
    marginTop: px(16),
    marginBottom: px(10),
    color:'white'
   },
   briefIntro:{
    fontSize: px(25),
    marginTop: px(10),
    color:'white'
   },



   detailBottom:{
    flexDirection:'column',
    paddingLeft: px(32),

   },
   smallTitle1:{
    fontSize: px(34),
    fontWeight: 'bold',
    marginTop: px(35),
    marginBottom: px(25),
    color:'white'
   },
   tagView:{
       height: px(60),
   },
   movieTag:{
    backgroundColor:'rgba(52, 52, 52, 0.5)',
    paddingLeft: px(21),
    paddingRight: px(10),
    borderRadius: px(40),
    marginRight: px(41),
    flexDirection:'row',
   },
   movieIntroduction:{
    paddingRight: px(32)
   },
   introFont:{
    color:'white',
    fontSize: px(30),
   },
   tagView1:{
    height: px(200),
   },
   actorView:{
    flexDirection: 'column',
    alignItems:'center',
    marginRight: px(40)
   },
   actorImg:{
    width: px(150),
    height:px(150),
    borderRadius: px(80),
    marginBottom: px(10),
   },
   actorImg1:{
    width: px(140),
    height:px(140),
    borderRadius: px(70),
    marginBottom: px(10),
    backgroundColor: 'gray'
   },
   introFont1:{
    color:'white',
    fontSize: px(28),
   }
   

}); 