import React, {Component} from 'react'
import { StyleSheet, Text, View, Button, TextInput} from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions/index'
import {connect} from 'react-redux'
import ActionButton from './ActionButton'
import {white} from '../utils/colors'

class AddDeck extends Component {

  state = {
    text: ''
  }

  submitName = () => {
    const {text} = this.state
    if(this.state.text){
    saveDeckTitle(text)
    this.props.dispatch(addDeck(text))
    this.props.navigation.navigate('DeckView', {entryId: text})
    this.setState({text:''})
    } 
  }

  render()  {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>What is the deck's name?</Text>
        <TextInput style={styles.input} onChangeText={(text) => this.setState({text: text})} value={this.state.text} />
        <ActionButton styles={styles} text={'Submit'} color='#2196F3'
        onPress={this.submitName} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#2196F3',
    margin:50,
    borderRadius: 8
  },
  title: {
    fontSize: 30,
    color: '#2196F3'
  },
  submitBtn: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 7,
    overflow: 'hidden'
  },
  actionBtn:{
    padding: 5,
    borderRadius: 7,
    height: 45,
    margin: 5,
    width: 170
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})
export default connect()(AddDeck)