import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Dimensions,
  TouchableOpacity
} from 'react-native';

// 获取设备屏幕尺寸，单位 dp
const {width} = Dimensions.get('window')


export default class HotItem extends React.Component{
    render(){
        const {item} = this.props;
        if(!item) return null;
        return (
            <TouchableOpacity onPress={this.props.onSelect}>
                <View style={styles.movieContainer}>
                    <Image
                        style={styles.movieImg}
                        source={{uri: item.images.large}}
                    />
                    <Text  ellipsizeMode='tail' numberOfLines= {1} style={styles.movieTitle}>{item.title}</Text>
        
                    <View style={styles.movieStar}>
                    </View>
                </View>
            </TouchableOpacity>
          )
    }
};


const styles = StyleSheet.create({
    movieContainer:{
      flexDirection: 'column',
      width: 0.28 * width,
      marginRight: 0.03 * width,
      marginTop: 0.035 * width

    },
    // x+3y+z+3box=width
    // box=0.28 x=0.032 y=0.021 z=0.01
    // 宽高比2 : 3
    movieImg:{
      width: 0.28 * width,
      height: 0.28 * width * 4/3,
      borderRadius: 3,
      borderColor:'gray'
    },
    movieTitle:{
      marginTop: 0.01 * width,
      fontSize: 0.035 * width,
      fontWeight: 'bold',
    }
});