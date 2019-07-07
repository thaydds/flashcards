import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from  './AppNavigator'
import {Provider} from 'react-redux'
import reducer from './reducers/index'
import { createStore } from 'redux'
import {
  setLocalNotification,
} from "./utils/helpers"
 
class App extends Component {
  componentDidMount = async () => {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App



