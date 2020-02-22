import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ToastAndroid,
  RefreshControl,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {connect} from 'react-redux'

import actions from '../action/index'
import NavigationUtil from '../navigator/NavigationUtil'
import HotItem from '../common/HotItem'

// 豆瓣api网址
const URL = 'https://api.douban.com/v2/movie/'
const apikey='?apikey=0b2bdeda43b5688921839c8ecb20399b'

// 获取设备屏幕尺寸，单位 dp
const {width, height} = Dimensions.get('window')


/**
 * 最热页面里面包含顶部动态tab
 * @class HotPage
 * @extends {React.Component}
 */
class HotPage extends React.Component{
  constructor(props){
    super(props);
    this.topTabNames =  ['Top250','热映', '即将上映']
  }
  _topTabNavigator(){
    const topTabs={};
    this.topTabNames.forEach((item, index)=>{
      topTabs['topTab'+index]={
        // 使用以下方法，为tab下的页面传入参数
        screen: props => <HotTabPage {...props} tabLabel={item}/>,
        navigationOptions:{
          title: item,

        }
      }
    })
    if(!this.tabNavigator){
      this.tabNavigator = createAppContainer(createMaterialTopTabNavigator(topTabs,{
        tabBarOptions:{
          tabStyle: styles.tabStyle, //标签框属性
          upperCaseLabel: false, // 是否使用标签大写
          scrollEnabled: true, // 是否支持选项卡滚动
          style:{
            backgroundColor: '#476'
          },
          indicatorStyle: styles.indicatorStyle, // 标签指示器样式
          labelStyle: styles.labelStyle, // 文字的样式
        }
      }));
    }
    return this.tabNavigator;
  }
  render(){
    const TopTabNavigator = this._topTabNavigator();
    return (
      <View style={styles.topTabView}>
        <TopTabNavigator/>
      </View>
    )
  }
};


/**
 * 顶部tab页面
 * @class HotTab
 * @extends {React.Component}
 */
class HotTab extends React.Component{
  constructor(props){
    super(props);
    // 从父组件获取tabLabel
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
    
  }

  componentDidMount(){
    this.loadData();
  }
  callback(){

    ToastAndroid.show('没有更多啦！', ToastAndroid.SHORT)
  }
  loadData(loadMore){
    const {onLoadHotData,onLoadMoreHotData} = this.props;
    const store = this._store();
    const url = this.creatUrl(this.storeName);
    if(loadMore){
  
      onLoadMoreHotData(this.storeName, ++store.pageIndex, store.items, url, this.callback)
    }else{
      // 把storeName，以及url传入dispatch，修改状态
      onLoadHotData(this.storeName, url,  )
    }
  }

  _store(){
    const {hot} = this.props;
    let store = hot[this.storeName];// 动态获取state
    if(!store){
      store = {
        items: [],
        isLoading: false,
        hideLoadingMore: true,
        pageIndex: 0
      }
    }      
    return store;          
  }

  creatUrl(key){
    // 使用豆瓣API的search+上key
    switch(key){
      case 'Top250':
        return URL + 'top250' + apikey;
      case '热映':
        return URL + 'in_theaters' + apikey;
      case '即将上映':
        return URL + 'coming_soon' + apikey;
      default:
        return false;
    }
  }

  // 电影单个列表引入
  renderItem({item}){    
    return <HotItem 
        item={item}
        onSelect={()=>{

        }}
      />
  }
  showIndicator(){
    return this._store().hideLoadingMore?null:
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
      </View>
  }
  render(){
    // 从prpos中取出hot的reducer的状态
    let store = this._store();
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listContainer}
          data={store.items}
          numColumns ={3} // 一行3个
          renderItem={this.renderItem}
          keyExtractor={item=>'' + item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={'#476'}
              colors = {['#476']}
              refreshing = {store.isLoading}
              onRefresh={()=>this.loadData()}
              tintColor={'#476'}
            />
          }
          ListFooterComponent = {() => this.showIndicator()}
          onEndReached={()=>{ //滚动调用两次，通过判断来解决
            setTimeout(()=>{
              if(this.canLoadMore){
                console.log('调用加载更多')
                this.loadData(true);
                this.canLoadMore = false;
              }
            },100);
          }}
          // 可见列表长度与底部的距离的比值  
          onEndReachedThreshold={0.1}
          // 用户开始滚动触发的方法，开始滚动才能下拉刷新
          onMomentumScrollBegin={()=>{
            this.canLoadMore = true; //fix 初始化时滚动调用onEndReached的问题
          }}
        />
      </View>
    );
  }
};

const mapStateToProps = state =>({
  hot: state.hot
})
const mapDispatchToProps = dispatch =>({
  onLoadHotData: (storeName, url)=>dispatch(actions.onLoadHotData(storeName, url)),
  onLoadMoreHotData:(storeName, pageIndex, dataArray, url, callBack)=>dispatch(
    actions.onLoadMoreHotData(storeName, pageIndex, dataArray, url, callBack)
  )
  
})
const HotTabPage = connect(mapStateToProps,mapDispatchToProps)(HotTab)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    topTabView:{
      flex:1
    },
    tabStyle:{
      minWidth: 0.4 * width
    },
    indicatorStyle:{
      height: 2,
      backgroundColor:'#F5FCFF'
    },
    labelStyle:{
      fontSize: 14,
    },
    listContainer:{
      paddingLeft: 0.03 * width
    },
    indicatorContainer:{
      alignItems:'center'
    },
    indicator:{
      color: '#476',
      margin: 10
    }
});

export default HotPage;
