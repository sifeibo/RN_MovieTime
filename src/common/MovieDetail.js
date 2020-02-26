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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// 获取设备屏幕尺寸，单位 dp
const {width} = Dimensions.get('window')


export default class HotItem extends React.Component{
    render(){
        
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                {/* 头部 */}
                <View style={styles.detailHead}>
                    <Image
                        style={styles.movieImg}
                        source={{uri:'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2570243317.webp'}}
                    />

                    <View style={styles.movieInform}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.bigTitle}>误杀误杀误杀误杀误杀误杀</Text>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.smallTitle}>误杀误杀误杀误杀误杀误杀（2019）</Text>
                        <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.briefIntro}>中国大陆/剧情 犯罪 悬疑sssssssssaaaaaaa</Text>
                    </View>
                </View>

                {/* 底部 */}
                <View style={styles.detailBottom}> 
                    <Text style={styles.smallTitle1}>所属频道</Text>
                    <ScrollView  showsHorizontalScrollIndicator={false} 
                    horizontal={true} 
                    style={styles.tagView}>
                        <View style={styles.movieTag}>
                            <Text style={styles.briefIntro}>悬疑</Text>
                            <MaterialIcons
                                name={'keyboard-arrow-right'}
                                size={20}
                                style={{color: 'white',marginTop:4.5}}/>
                        </View>
                        <View style={styles.movieTag}>
                            <Text style={styles.briefIntro}>犯罪</Text>
                            <MaterialIcons
                                name={'keyboard-arrow-right'}
                                size={20}
                                style={{color: 'white',marginTop:4.5}}/>
                        </View>
                        <View style={styles.movieTag}>
                            <Text style={styles.briefIntro}>2019: 最强大电影节</Text>
                            <MaterialIcons
                                name={'keyboard-arrow-right'}
                                size={20}
                                style={{color: 'white',marginTop:4.5}}/>
                        </View>
                        <View style={styles.movieTag}>
                            <Text style={styles.briefIntro}>悬疑</Text>
                            <MaterialIcons
                                name={'keyboard-arrow-right'}
                                size={20}
                                style={{color: 'white',marginTop:4.5}}/>
                        </View>
                        <View style={styles.movieTag}>
                            <Text style={styles.briefIntro}>犯罪</Text>
                            <MaterialIcons
                                name={'keyboard-arrow-right'}
                                size={20}
                                style={{color: 'white',marginTop:4.5}}/>
                        </View>
                        <View style={styles.movieTag}>
                            <Text style={styles.briefIntro}>2019: 最强大电影节</Text>
                            <MaterialIcons
                                name={'keyboard-arrow-right'}
                                size={20}
                                style={{color: 'white',marginTop:4.5}}/>
                        </View>
                    </ScrollView>


                    <Text style={styles.smallTitle1}>简介</Text>
                    <View style={styles.movieIntroduction}>
                        <Text numberOfLines={4} ellipsizeMode={'clip'} style={styles.introFont}>
                            李维杰李维杰李维杰李维杰
                            李维杰李维杰李维杰李维杰
                            李维杰李维杰李维杰李维杰李维杰
                            李维杰李维杰李维杰李维杰李维杰
                            李维杰李维杰李维杰 李维杰李维杰李维杰李维杰
                            李维杰李维杰李维杰李维杰
                            李维杰李维杰李维杰李维杰李维杰
                            李维杰李维杰李维杰李维杰李维杰
                            李维杰李维杰李维杰
                        </Text>
                    </View>


                    <Text style={styles.smallTitle1}>演职员</Text>
                    <ScrollView  showsHorizontalScrollIndicator={false} 
                    horizontal={true} 
                    style={styles.tagView1}>
                        <View style={styles.actorView}>
                            <Image
                            style={styles.actorImg}
                            source={{uri:'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p37050.webp'}}
                            />
                            <Text style={styles.briefIntro}>肥肥波</Text>
                        </View>
                        <View style={styles.actorView}>
                            <Image
                            style={styles.actorImg}
                            source={{uri:'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p37050.webp'}}
                            />
                            <Text style={styles.briefIntro}>肥肥波</Text>
                        </View>
                        <View style={styles.actorView}>
                            <Image
                            style={styles.actorImg}
                            source={{uri:'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p37050.webp'}}
                            />
                            <Text style={styles.briefIntro}>肥肥波</Text>
                        </View>
                        <View style={styles.actorView}>
                            <Image
                            style={styles.actorImg}
                            source={{uri:'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p37050.webp'}}
                            />
                            <Text style={styles.briefIntro}>肥肥波</Text>
                        </View>
                        <View style={styles.actorView}>
                            <Image
                            style={styles.actorImg}
                            source={{uri:'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p37050.webp'}}
                            />
                            <Text style={styles.briefIntro}>肥肥波</Text>
                        </View>
                    </ScrollView>

                    <Text style={styles.smallTitle1}>预告片/剧照</Text>

                    <Text style={styles.smallTitle1}>短评</Text>

                </View>
                </ScrollView>
            </View>   
          )
    }
};


const styles = StyleSheet.create({
   container:{
    flex: 1,
    
   },
   detailHead:{
    flexDirection: 'row',
    paddingBottom: 0.1 * width,
    backgroundColor: 'grey',
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
   },
   smallTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
   },
   briefIntro:{
    fontSize: 13,
    marginTop: 5,
    color:'white'
   },



   detailBottom:{
    flexDirection:'column',
    backgroundColor: '#476',
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