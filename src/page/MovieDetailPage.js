import React,{ Component } from 'react';


import MovieDetail from '../common/MovieDetail'
import DataStore from '../expand/localdb/DataStore'
import BackPress from '../common/BackPress'
import NavigationUtil from '../navigator/NavigationUtil'




const URL = 'http://api.douban.com/v2/movie/subject/'
const apikey='?apikey=0b2bdeda43b5688921839c8ecb20399b'

class MovieDetailPage extends Component{
  constructor(props){
    super(props);
    this.backPress = new BackPress({backPress: () => this.onBackPress()});
    this.state = { 
      infromation: {}
    }
  }
  componentDidMount(){
    this.backPress.componentDidMount();
    const {id} = this.props.navigation.state.params;
    console.log(id)
    this.loadData(id);
    
  }
  // 获取详情数据
  loadData(id){
    let dataStore = new DataStore();
    let url = URL + id + apikey
    dataStore.fetchData(url) 
    .then(data=>{
      // console.log(data.data.data)
      this.setState({
        infromation: data.data.data
      })
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
  render(){
    if (Object.keys(this.state.infromation).length!= 0){
      return (
        // id={this.props.navigation.state.params.id}
        <MovieDetail  data={this.state.infromation}  navigation={this.props.navigation}/>
      );
    }else{
      return null
    }
  }
};


export default  MovieDetailPage;
