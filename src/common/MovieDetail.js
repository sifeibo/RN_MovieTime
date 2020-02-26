import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  Image,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  RecyclerViewBackedScrollViewComponent
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// 获取设备屏幕尺寸，单位 dp
const {width} = Dimensions.get('window')
const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 70;


const arrToString = function(arr){
    let string = '';
    for(let j = 0,len=arr.length; j < len; j++){
        string += arr[j] + ' '
    }
    return string + '/';
}

export default class HotItem extends React.Component{
    getActors(casts){
        let actors = [];
        for(let i=0 , len=casts.length; i < len; i++) {
            actors.push(
                <View style={styles.actorView} key={i}>
                    <Image
                    style={styles.actorImg}
                    source={{uri:casts[i].avatars.large}}
                    />
                    <Text style={styles.briefIntro}>{casts[i].name}</Text>
                </View>
            ) 
        }
        return actors;
    }
    getTags(tags){
        let tag = [];
        for(let i=0 , len=tags.length; i < len; i++) {
            tag.push(
                <View style={styles.movieTag} key={i}>
                    <Text style={styles.briefIntro}>{tags[i]}</Text>
                    <MaterialIcons
                        name={'keyboard-arrow-right'}
                        size={20}
                        style={{color: 'white',marginTop:4}}/>
                </View>
            ) 
        }
        return tag;
    }
    getParallaxRenderConfig(data){
        let config={};
        let introduction = arrToString(data.countries) + arrToString(data.genres) + 
        '上映时间：'+ arrToString(data.pubdates) + '片长：' + arrToString(data.durations)
        console.log(data)
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
        config.renderFixedHeader=() => (
            <View key="fixed-header" style={styles.fixedSection}>
              <Text style={styles.fixedSectionText}
                    onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                Scroll to top
              </Text>
            </View>
          );
        return config;
    }
    render(){
        const {data} = this.props;
        const renderConfig = this.getParallaxRenderConfig(data);
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
    fontSize: 20,
    margin: 10,
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },



   detailHead:{
    flexDirection: 'row',
    marginTop: 80,
    paddingBottom: 0.1 * width,
    paddingRight: 15,
    paddingLeft:15
   },
   movieImg:{
    width: 0.28 * width,
    height: 0.28 * width * 4/3,
    borderRadius: 3,
    borderColor:'gray',
   },
   movieInform:{
    flexDirection: 'column',
    marginLeft:  0.05 * width,
    width: 0.57 * width
   },
   bigTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color:'white'
   },
   smallTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color:'white'
   },
   briefIntro:{
    fontSize: 12,
    marginTop: 5,
    color:'white'
   },



   detailBottom:{
    flexDirection:'column',
    paddingLeft: 15,
    paddingRight: 15

   },
   smallTitle1:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color:'white'
   },
   tagView:{
       height: 30,
   },
   movieTag:{
    backgroundColor:'rgba(52, 52, 52, 0.5)',
    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: 20,
    marginRight: 20,
    flexDirection:'row',
    

   },
   movieIntroduction:{
    
   },
   introFont:{
       color:'white',
       fontSize: 14,
   },
   tagView1:{
    height: 110,
   },
   actorView:{
    flexDirection: 'column',
    alignItems:'center',
    marginRight: 20
   },
   actorImg:{
    width: 70,
    height:70,
    borderRadius: 40,
    marginBottom: 5
   }
   

}); 