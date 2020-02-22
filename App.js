import React from 'react'
import {Provider} from 'react-redux'
import AppNavigator from './src/navigator/AppNavigator'
import store from './src/store'



export default class App extends React.Component{
  render(){
    return (
      <Provider store = {store}>
        <AppNavigator/>
      </Provider>
    );
  }
};



