import React,{ Component } from 'react';


import MovieDetail from '../common/MovieDetail'
import DataStore from '../expand/localdb/DataStore'



const URL = 'http://api.douban.com/v2/movie/subject/'
const apikey='?apikey=0b2bdeda43b5688921839c8ecb20399b'

class MovieDetailPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      infromation: {}
    }
  }
  componentDidMount(){
    const {id} = this.props.navigation.state.params;
    this.loadData(id)
  }
  // 获取详情数据
  loadData(id){
    let dataStore = new DataStore();
    let url = URL + id + apikey
    dataStore.fetchData(url) 
    .then(data=>{
      this.setState({
        infromation: data.data.data
      })
    })
  }
  render(){
    if (Object.keys(this.state.infromation).length!= 0){
      return (
        <MovieDetail data={this.state.infromation} navigation={this.props.navigation}/>
      );
    }else{
      return null
    }
  }
};


export default  MovieDetailPage;
