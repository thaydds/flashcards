import React, {Component} from 'react'
import { StyleSheet, Text, Animated, ScrollView} from 'react-native'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions/index'
import ActionButton from './ActionButton'
import {white} from '../utils/colors'

class DeckList extends Component { 
  state ={
    rotate: new Animated.Value(0),
  }
  componentDidMount(){
    getDecks().then(decks => this.props.receiveDecks(decks))
  }

  handleAnimation = () => {
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
  }

  render() {
    const {decks} = this.props
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
    return(
      <ScrollView style={styles.container}>
      {Object.keys(decks).length > 0 ?
       Object.keys(decks).map( deck => {
        const {title, questions} = decks[deck]
        return(
          <Animated.View style={[styles.card, rotateInterpolate]} key={deck}>
            <Text style={styles.cardText}>{title}</Text>
            <Text style={styles.cardText}>{`Q: ${questions.length}`}</Text>
            <ActionButton styles={styles} text={'View Deck'} color={white}
            onPress={() => {
              this.handleAnimation()
              this.props.navigation.navigate('DeckView', {entryId: deck})
            }} />
          </Animated.View>
        )
      }) :
      <Text>No Data</Text>
      }  
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignSelf: 'stretch',
    padding: 5
  },
  actionBtn:{
    padding: 5,
    borderRadius: 7,
    height: 45,
    margin: 5,
    width: 170
  },
  submitBtnText: {
    color: '#2196F3',
    fontSize: 22,
    textAlign: 'center'
  },
  card: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    margin: 8,
    height: 200,
    borderRadius: 10
  },
  cardText: {
    fontSize: 30,
    color: white,
  }
})

function mapStateToProps(decks){
  return {
    decks,
  }
}

function mapDispatchToProps(dispatch){
  return {
    receiveDecks: (decks) => dispatch(receiveDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)