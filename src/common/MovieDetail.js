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
import Entypo from 'react-native-vector-icons/Entypo'
import NavigationUtil from '../navigator/NavigationUtil'

import Star from '../common/Star'
import { px } from '../util/device';
import LoveDao from '../expand/localdb/LoveDao'
import axios from 'axios';
import {connect} from 'react-redux'
import actions from '../action/index'
import ShareUtil from '../util/ShareUtil'
import share from "../res/share.json";


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

class HotItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoveKeys: false,
            isShowIntro: false,
            introLines: 4
        }
    }
    // 检测是否存在于用户收藏列表中
    isInMovies(id){
        axios({method: 'post',
            url: 'http://192.168.43.62:9999/isInMovies/', 
            data:{
             userId: id,
             movieId: this.props.data.id
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {'content-type': 'application/x-www-form-urlencoded'},
          })
          .then(response =>{
            //   console.log(response)
              if(response.data.state=="success"){
                this.setState({
                    isLoveKeys: true
                })
              }
          })
    }
    componentDidMount(){
        // console.log(this.props.login.userInfo)
        // loveDao.getLoveKeys().then((data)=>{
        //     console.log(data)
        // })
        // loveDao.isLoveKeys(this.props.id).then((isLoveKeys)=>{
        //     this.setState({isLoveKeys})
        //     console.log(isLoveKeys)
        // })
        // 如果存在用户信息则检测是否存在于收藏中
        if(this.props.login.userInfo !== null){
            this.isInMovies(this.props.login.userInfo.id)
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.login.userInfo !== this.props.login.userInfo){
            this.isInMovies(nextProps.login.userInfo.id)
        }
    }
   
    // 短评
    getcomments(popular_comments){
        let comments = [];
        for(let i=0,len=popular_comments.length; i < len; i++) {
            comments.push(
                <View style={styles.commentView}>
                <Image style={styles.reviewerImage}
                source={{uri:popular_comments[i].author.avatar}}/>
                <Text style={styles.reviewerName}>{popular_comments[i].author.name}</Text>
                <Text style={styles.commentTime}>{popular_comments[i].created_at}</Text>
                <Star style={styles.star} value={popular_comments[i].rating.value * 2} size={px(26)} margin={px(1)} />
                <Text style={styles.comment}>{popular_comments[i].content}</Text>
                <View style={styles.view4}>
                    
                    <AntDesign name={'like1'}
                            size={px(30)}
                            style={{color: 'white'}}/>
                    <Text style={styles.useful_count}>{popular_comments[i].useful_count}</Text>
                </View>
               
                </View>
            )
        }
        return comments
    }
    // 预告片剧照
    getPhotos(photos){
        let pics = [];
        let len = photos.length;
        for(let i=0; i < 10; i++) {
            if (i<len){
                pics.push(
                    <Image
                    style={styles.photoImg}
                    source={{uri:photos[i].image}}/>
                ) 
            }
        }
        return pics;
    }
    // 显示/收起简介
    getShowIntro(){
        if(!this.state.isShowIntro){
            return(
                <TouchableOpacity style={styles.introShow} onPress={() => {
                    this.setState({
                        isShowIntro: true,
                        introLines: 100
                    })
                }}>
                <Text style={styles.introFont}>显示全部</Text>
                <Entypo name={'chevron-down'}
                        size={px(45)}
                        style={{color: 'white'}}/>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity style={styles.introShow} onPress={() => {
                    this.setState({
                        isShowIntro: false,
                        introLines: 4
                    })}}>
                <Text style={styles.introFont}>收起</Text>
                <Entypo name={'chevron-up'}
                        size={px(40)}
                        style={{color: 'white'}}/>
                </TouchableOpacity>
                
            )
        }
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
                        <Text style={styles.introFont1} numberOfLines={1} ellipsizeMode={'tail'}>{casts[i].name}</Text>
                    </View>
                ) 
            }else{
                actors.push(
                    <View style={styles.actorView} key={i}>
                        <Image
                        style={styles.actorImg}
                        source={{uri:casts[i].avatars.large}}
                        />
                        <Text style={styles.introFont1} numberOfLines={1} ellipsizeMode={'tail'}>{casts[i].name}</Text>
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
            <Image 
                style={{ width: width,height: PARALLAX_HEADER_HEIGHT}}
                source={{uri: data.photos[0].image}}/>
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
                    // loveDao.moveLoveItem(data.id)
                    axios({method: 'post',
                        url: 'http://192.168.43.62:9999/deleteStore/', 
                        data:{
                        userId: this.props.login.userInfo.id,
                        movieId: this.props.data.id
                        },
                        transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                        }],
                        headers: {'content-type': 'application/x-www-form-urlencoded'},
                    })
                    .then(response =>{
                        // console.log(response)
                        if(response.data.state=="success"){
                            this.props.onCollectionAction();
                            this.setState({
                                isLoveKeys: false
                            })
                        }
                    })
                }}>
                        <AntDesign 
                        name={'star'}
                        size={24}
                        style={{color: 'white'}}
                        />
                </TouchableOpacity>
                 <TouchableOpacity style={{position: 'absolute',bottom: -2,right: 10,width:50,height:50,alignItems:'center',justifyContent:'center'}} 
                 onPress={() => {
                    let shareApp = share.share_app;
                    ShareUtil.shareboard(shareApp.content, data.images.large, data.share_url, data.title, [0, 2, 3, 4], (code, message) => {
                        console.log("result:" + code + message);
                    });
                 }}>
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
                    if(this.props.login.userInfo !== null){
                        let obj = {
                            userid: this.props.login.userInfo.id,
                            movieid: data.id,
                            moviename: data.title,
                            movieimg: data.images.large,
                            moviestar: data.rating.average,
                            moviecontent: introduction
                        }
                        obj = JSON.stringify(obj)
                        // loveDao.saveLoveItem(data.id,obj)
                        axios({method: 'post',
                            url: 'http://192.168.43.62:9999/addStore/', 
                            data:{
                                obj: obj
                            },
                            transformRequest: [function (data) {
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                            }],
                            headers: {'content-type': 'application/x-www-form-urlencoded'},
                        })
                        .then(response =>{
                            // console.log(response)
                            if(response.data.state=="success"){
                                this.props.onCollectionAction();
                                this.setState({isLoveKeys: true})
                            }
                        })
                    }else{
                        NavigationUtil.movePage({},'LoginPage')
                    }
                    }}>
                        <AntDesign 
                        name={'staro'}
                        size={24}
                        style={{color: 'white'}}
                        />
                </TouchableOpacity>
                 <TouchableOpacity style={{position: 'absolute',bottom: -2,right: 10,width:50,height:50,alignItems:'center',justifyContent:'center'}} 
                 onPress={() => {
                    let shareApp = share.share_app;
                    ShareUtil.shareboard(shareApp.content, data.images.large, data.share_url, data.title, [0, 2, 3, 4], (code, message) => {
                        console.log("result:" + code + message);
                    });
                    // ShareUtile.share('我发现了一部好电影快来看看吧！',data.images.large,data.images.large,data.title,0,(code,message) =>{
                    //     console.log(message)
                    // });
                 }}>
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
        const photos = this.getPhotos(data.photos);
        const comments = this.getcomments(data.popular_comments)
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                backgroundColor={this.props.themeColor}
                contentBackgroundColor={this.props.themeColor}
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
                        <Text numberOfLines={this.state.introLines} ellipsizeMode={'tail'} style={styles.introFont}>
                           {data.summary}
                        </Text>
                        {this.getShowIntro()}
                    </View>


                    <Text style={styles.smallTitle1}>演员</Text>
                    <ScrollView  showsHorizontalScrollIndicator={false} 
                    horizontal={true} 
                    style={styles.tagView1}>
                        {actors}
                    </ScrollView>

                    <Text style={styles.smallTitle1}>剧照</Text>
                    <ScrollView  showsHorizontalScrollIndicator={false} 
                    horizontal={true} 
                    style={styles.tagView2}>
                        {photos}
                    </ScrollView>
                    
                    <Text style={styles.smallTitle1}>热评</Text>
                    <View style={styles.View3}>
                    {comments}
                    </View>

                </View>
                </ParallaxScrollView>
            </View>   
          )
    }
};

const mapStateToProps = state => ({
    login: state.login,
    themeColor: state.theme.themeColor
});

const mapDispatchToProps = dispatch =>({
    onCollectionAction: ()=>dispatch(actions.onCollectionAction())
});

export default  connect(mapStateToProps, mapDispatchToProps)(HotItem);

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
   introShow:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent:'center',
    paddingTop: px(10)
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
    width: px(170),
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
   },
   photoImg:{
    width:px(360),
    height:px(230),
    borderRadius: px(10),
    marginRight: px(20)
   },
   
   View3:{
    paddingRight: px(32),
    marginBottom: px(30),
   },
   commentView:{
 
    paddingLeft:px(20),
    paddingRight: px(20),
    position:'relative',
    borderBottomWidth: px(1),
    borderColor:'gray',
    backgroundColor:'rgba(0,0,0,.2)',
    borderRadius: px(5),
   },
   reviewerImage:{
    marginTop: px(40),
    marginLeft: px(15),
    width:px(80),
    height:px(80),
    borderRadius: px(40),
   },
   reviewerName:{
    position: 'absolute',
    left:px(135),
    top:px(42),
    color:"white"
   },
   commentTime:{
    position: 'absolute',
    color:"white",
    right:px(60),
    top:px(82),
    fontSize:px(25)
   },
   comment:{
    color:"white",
    margin: px(30),
    marginBottom: px(80)
   },
   star:{
    position:'absolute',
    left:px(135),
    top:px(80),
   },
   useful_count:{
    color:"white",
    fontSize:px(25),
   },
   view4:{
    position:'absolute',
    flexDirection:'row',
    left:px(550),
    bottom:px(30)
   }
}); 