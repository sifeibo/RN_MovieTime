import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Star from '../common/Star'
import { px } from '../util/device';


// 获取设备屏幕尺寸，单位 dp
const {width} = Dimensions.get('window')

/**
 * item:{
 *  movieName,
 *  movieImage,
 *  movieid,
 *  star,
 *  content,
 * }
 */

export default class HotItem extends React.Component{
    render(){
        const {item} = this.props;
        if(!item) return null;
        return (
            <TouchableOpacity onPress={this.props.onSelect}>
                <View style={styles.movieContainer}>
                    <Image
                        style={styles.movieImg}
                        source={{uri: item.movieimg}}
                    />
                   <View style={styles.movieInform}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.smallTitle}>{item.moviename}</Text>
                    <Star value={item.moviestar} size={px(26)} fontColor={'black'} margin={px(1)} />
                    <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.briefIntro}>{item.moviecontent}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          )
    }
};


const styles = StyleSheet.create({
    movieContainer:{
      flexDirection: 'row',
      height: px(310),
      paddingLeft:px(35),
      alignItems:'center',
      borderColor: '#d3d3d3',
      borderBottomWidth: 0.3,
    },
    movieImg:{
      width: px(210),
      height: px(280),
      borderRadius: 3,
      borderColor:'gray',
    },
    movieInform:{
      flexDirection: 'column',
      height: px(280),
      marginLeft:  px(25),
      width: width - px(296),
     },

     smallTitle:{
      fontSize: px(34),
      fontWeight: 'bold',
      marginTop: px(30),
      marginBottom: px(30),
     },
     briefIntro:{
      fontSize: px(25),
      marginTop: px(30),
     },
});