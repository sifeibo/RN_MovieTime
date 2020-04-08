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
  constructor(props){
    super(props);
    this.state={
      items: []
    }
  }
  // 获取收藏数据
  loadData(id){
    axios({method: 'post',
      url: 'http://192.168.43.62:9999/getAllMovies/', 
      // data: formData,
      // 2. 增加transformRequest方法在发送post数据之前改变数据格式
      data:{
        id: id
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
      console.log(response)
      if(response.data.state === 'success'){
        this.setState({
          items: response.data.data
        })
      }
    })
  }
  componentDidMount(){
    if(this.props.login.userInfo !==null){
      this.loadData(this.props.login.userInfo.id);
    }
  }
  // 监听props改变
  UNSAFE_componentWillReceiveProps(nextProps){
    console.log("监听到有收藏操作")
    if(nextProps.collection.tag !== this.props.collection.tag){
      this.loadData(this.props.login.userInfo.id);
    }
    if(nextProps.login.userInfo !== this.props.login.userInfo){
      this.loadData(nextProps.login.userInfo.id);
    }
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
    let items = this.state.items;
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

const mapStateToProps = state =>({
  login: state.login,
  collection: state.collection
});
const mapDispatchToProps = dispatch =>({
  onThemeChangeColor: themeColor=>dispatch(actions.onThemeChangeColor(themeColor))
});
export default connect(mapStateToProps, mapDispatchToProps)(LovePage);
