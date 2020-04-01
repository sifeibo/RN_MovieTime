import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  RefreshControl
} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action/index'
import NavigationBar from '../common/NavigationBar'
import axios from 'axios';
import LoveItem from '../common/LoveItem'
import NavigationUtil from '../navigator/NavigationUtil'



class LovePage extends React.Component{
  componentDidMount(){
    // axios({method: 'post',
    //   url: 'http://192.168.43.62:9999/getAllMovies/', 
    //   // data: formData,
    //   // 2. 增加transformRequest方法在发送post数据之前改变数据格式
    //   data:{
    //     name: this.state.name,
    //     password: this.state.password
    //   },
    //   transformRequest: [function (data) {
    //     let ret = ''
    //     for (let it in data) {
    //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //     }
    //     return ret
    //   }],
    //   headers: {'content-type': 'application/x-www-form-urlencoded'},
    // })
    // .then(response =>{
      
    // })
  }
  renderItem({item}){
    return <LoveItem 
    item={item}
    onSelect={()=>{
      NavigationUtil.movePage({
        id: item.movieid
      }, 'MovieDetailPage')
    }}
    />
  }
  render(){
    let statusBar={ backgroundColor: '#476', barStyle: 'light-content',hidden: false}
    let navigationBar = <NavigationBar title={'我的收藏'} statusBar = {statusBar} style = {{backgroundColor: '#476'}} />
    let items = [{
      movieName: '千与千寻',
      movieImg: 'http://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg',
      movieid: '1291561',
      movieStar: 7.5,
      movieContent: '日本 /剧情 动画 奇幻/ 上映时间: 2001-7-20(日本)日本 /剧情 动画 奇幻/ 上映时间: 2001-7-20(日本)'},
      {
      movieName: '美丽人生',
      movieImg: 'http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2578474613.jpg',
      movieid: '1292063',
      movieStar: 9.5,
      movieContent: '日本 /剧情 动画 奇幻/ 上映时间: 2001-7-20(日本)日本 /剧情 动画 奇幻/ 上映时间: 2001-7-20(日本)'}];
    return (
      
      <View style={styles.container}>
        {navigationBar}
        <FlatList
          style={styles.listContainer}
          data={items}
          numColumns ={1} // 一行1个
          renderItem={this.renderItem}
          keyExtractor={item=>'' + item.movieid}
          // refreshControl={
          //   <RefreshControl
          //     title={'Loading'}
          //     titleColor={'#476'}
          //     colors = {['#476']}
          //     refreshing = {store.isLoading}
          //     onRefresh={()=>this.loadData()}
          //     tintColor={'#476'}
          //   />
          // }
        />


          {/* <Button  title='改变主题颜色'
            onPress={()=>{
              console.log(this.props)
              this.props.onThemeChangeColor('red')
            }}
          /> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
});

const mapStateToProps = state =>({});
const mapDispatchToProps = dispatch =>({
  onThemeChangeColor: themeColor=>dispatch(actions.onThemeChangeColor(themeColor))
});
export default connect(mapStateToProps, mapDispatchToProps)(LovePage);
