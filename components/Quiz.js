import React, {Component} from 'react'
import { NavigationActions } from 'react-navigation'
import {connect} from 'react-redux'
import {white} from '../utils/colors'
import ActionButton from './ActionButton'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'
import {StyleSheet,
        View,
        Text,
        Animated} from 'react-native'

class Quiz extends Component {

  state={
    questionNumber: 0,
    showAnswer: false,
    correct: 0,
    incorrect: 0,
    animation: new Animated.Value(0.5),
    rotate: new Animated.Value(0),
    colorChange: new Animated.Value(0),
    isQuizFinished: false
  }

  submitAnswer= (answer) => {
    

    const { questionNumber } = this.state
    const deck = this.props.navigation.state.params.entryId
    const decks = this.props.decks
    const correct = decks[deck].questions[questionNumber].correctAnswer.toLowerCase()


    if((questionNumber + 1) === decks[deck].questions.length){
      this.setState({isQuizFinished:true})
    }

    correct === answer ? 
      this.setState({correct: this.state.correct +1}) : 
      this.setState({incorrect: this.state.incorrect +1})
    this.setState({questionNumber: this.state.questionNumber + 1, showAnswer: false})
    this.handleAnimation()
  }

  async componentDidUpdate() {
    if (this.state.isQuizFinished) {
      this.delayNotificationUntilTomorrow()
    }
  }

  delayNotificationUntilTomorrow = async () => {
    await clearLocalNotification()
    await setLocalNotification()
  }

  replayQuiz = () => {
    this.setState({
      questionNumber: 0,
      showAnswer: false,
      correct: 0,
      incorrect: 0,
      isQuizFinished: false
    })
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back({key:null}))
  }

  handleAnimation = () => {
    Animated.spring(this.state.animation, {
      toValue: 1.1,
      friction: 1,
      tension: 360,
      duration: 1000
    }).start(() => {
      Animated.spring(this.state.animation, {
        toValue: 0.5,
        duration:1000
      })
    })

    Animated.timing(this.state.rotate, {
      toValue: 360,
      duration: 1500,
      delay: 1000
    }).start(() => {
      Animated.timing(this.state.rotate, {
        toValue: 0,
        duration: 1000,
      }).start()
    })

    Animated.timing(this.state.colorChange, {
      toValue: 1,
      duration: 1500,
    }).start(() => {
      Animated.timing(this.state.colorChange, {
        toValue: 0,
        duration: 1000,
      }).start()
    })
  }

  render(){
    const decks = this.props.decks
    const deck = this.props.navigation.state.params.entryId
    const number = this.state.questionNumber + 1
    const questionNumber = this.state.questionNumber

    const animatedStyle= {
      transform:[
        {scale: this.state.animation}
      ]
    }

    const rotateInterpolate = this.state.rotate.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "1080deg"]
    })

    const rotateStyle = {
      transform: [
        {
          rotate: rotateInterpolate
        }
      ]
    }

    const boxInterpolation = this.state.colorChange.interpolate({
      inputRange: [0,1],
      outputRange:['rgba(0, 0, 0, 0)', 'rgba(185, 63, 179, 1)']
    })

    const boxAnimation = {
      backgroundColor: boxInterpolation
    }

    if(questionNumber === decks[deck].questions.length){
      return(
        <View style={styles.container}>
          <Animated.View style={[styles.card, boxAnimation]}>
            <Animated.View style={animatedStyle}>
              <Text style={styles.mainText}>You got {this.state.correct} out of {decks[deck].questions.length} !</Text>
            </Animated.View>
            {this.state.correct > this.state.incorrect ?
            <Animated.View style={rotateStyle}>
              <Text style={{fontSize:90}}>😁</Text>
            </Animated.View>
            :
            <Animated.View style={rotateStyle}>
              <Text style={{fontSize:90}}>😒</Text>
            </Animated.View>
            }
            <ActionButton styles={styles} text={'Restart Quiz'} color={'#2196F3'} onPress={this.replayQuiz}  />
            <ActionButton styles={styles} text={'Back To Deck'} color={'#2196F3'} onPress={this.goBack}   /> 
          </Animated.View>
        </View>
      )
    }
    return(
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.questions}>{number} / {decks[deck].questions.length}</Text>
          {this.state.showAnswer ? 
          <View style={styles.container}>
            <Text style={styles.mainText}>{decks[deck].questions[questionNumber].answer}</Text>
            <ActionButton styles={styles} text={'Correct'} color={'green'} onPress={()=> this.submitAnswer('true')} />
            <ActionButton styles={styles} text={'Incorrect'} color={'red'} onPress={()=> this.submitAnswer('false')} />
        </View> :
            <Text style={styles.mainText}>{decks[deck].questions[questionNumber].question}</Text>
         }
          <ActionButton styles={styles} onPress={()=> this.setState({showAnswer: !this.state.showAnswer})} text={'Show Answer'} color={'#2196F3'} />
  
          
        </View>
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
  },
  questions: {
    top: 0,
    alignSelf: 'flex-start',
    left: 0,
    fontSize: 20,
    margin: 5,
    position: "absolute"
  },
  answer: {
    fontSize: 20,
    margin: 20
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    alignSelf: 'stretch',
    borderRadius: 10
  },
  mainText: {
    fontSize: 40,
    marginTop: 40,
    textAlign: "center"
  }

})

function mapStateToProps(decks){
  return {
    decks,
  }
}

export default connect(mapStateToProps)(Quiz)