import React, {Component} from 'react'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions/index'
import {connect} from 'react-redux'
import {white} from '../utils/colors'
import ActionButton from './ActionButton'
import {StyleSheet,
        View,
        TouchableOpacity,
        TextInput,
        Text,
        KeyboardAvoidingView} from 'react-native'

class AddCard extends Component {
  state={
    question: '',
    answer: '',
    correctAnswer: ''
  }
  submitCard= (deck) => {
    const { question, answer, correctAnswer } = this.state
    const isValid = (correctAnswer.toLocaleLowerCase().trim() === 'true' || correctAnswer.toLocaleLowerCase().trim() === 'false')
    ? true : false
    if(question && answer && isValid){
      this.props.dispatch(addCard({question, answer, correctAnswer, deck}))
      addCardToDeck(deck, {question, answer, correctAnswer})
      this.setState({question: '', answer: '', correctAnswer: ''})
      this.props.navigation.dispatch(NavigationActions.back({key: null}))
    }
   
  }
  render(){
    const deckName = this.props.navigation.state.params.entryId
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>What is the question?</Text>
          <TextInput style={styles.input} onChangeText={(question)=> this.setState({question: question})} value={this.state.question}></TextInput>
          <Text style={styles.title}>What is the answer</Text>
          <TextInput style={styles.input} onChangeText={(answer)=> this.setState({answer: answer})} value={this.state.answer}></TextInput>
          <Text style={styles.title}>The answer is true or false?</Text>
          <Text style={styles.title}>(type only true or false)</Text>
          <TextInput style={styles.input} onChangeText={(correctAnswer)=> this.setState({correctAnswer: correctAnswer})} value={this.state.correctAnswer}></TextInput>
          <ActionButton styles={styles} text={'Submit'} color='#2196F3'
          onPress={() => this.submitCard(deckName)} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(AddCard)

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  title: {
    fontSize: 30,
    color: '#2196F3'
  },
  submitBtn: {
    borderWidth: 0.5,
    borderColor: '#2196F3',
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 7,
    overflow: 'hidden'
  },
  input: {
    width:250,
    height:40,
    padding:8,
    borderWidth:1,
    borderColor: '#2196F3',
    margin:20,
    borderRadius: 7
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