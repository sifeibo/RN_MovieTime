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
import LoveItem from '../common/LoveItem'
import NavigationUtil from '../navigator/NavigationUtil'



class LovePage extends React.Component{
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
      id: 1,
      movieName: '千与千寻',
      movieImage: 'http://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg',
      movieid: '1291561',
      star: 9.3,
      content: '日本 /剧情 动画 奇幻/ 上映时间: 2001-7-20(日本)日本 /剧情 动画 奇幻/ 上映时间: 2001-7-20(日本)'},
      {
      id: 1,
      movieName: '美丽人生',
      movieImage: 'http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2578474613.jpg',
      movieid: '1292063',
      star: 9.5,
      content: '日本 /剧情 动画 奇幻/ 上映时间: 2001-7-20(日本)日本 /剧情 动画 奇幻/ 上映时间: 2001-7-20(日本)'}];
    return (
      
      <View style={styles.container}>
        {navigationBar}
        <FlatList
          style={styles.listContainer}
          data={items}
          numColumns ={1} // 一行1个
          renderItem={this.renderItem}
          keyExtractor={item=>'' + item.id}
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

    },
    welcome:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

const mapStateToProps = state =>({});
const mapDispatchToProps = dispatch =>({
  onThemeChangeColor: themeColor=>dispatch(actions.onThemeChangeColor(themeColor))
});
export default connect(mapStateToProps, mapDispatchToProps)(LovePage);
