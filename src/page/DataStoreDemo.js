import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import DataStore from '../expand/localdb/DataStore'


class DataStoreDemo extends React.Component{
  constructor(props){
    super(props);
    this.state ={
        showText: ''
    }
    this.dataStore = new DataStore();
  }
  loadData(){
      let url='https://api.douban.com/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b'
      this.dataStore.fetchData(url)
        .then(data=>{
            console.log(data);
            let showDate = new Date(data.timestamp);
            this.setState({
              showText: showDate +''
            })
        }).catch(error =>{
          error && console.log(error.toString());
        })
  }
  componentDidMount(){
      this.loadData();
  }
  render(){
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>{this.state.showText}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

export default DataStoreDemo;
