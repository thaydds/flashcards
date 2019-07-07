import React, {Component} from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { getData } from '../utils/api'
import {connect} from 'react-redux'
import ActionButton from './ActionButton'
import {white} from '../utils/colors'
 

class DeckView extends Component {
  render()  {
    const deck = this.props.navigation.state.params.entryId
    const decks = this.props.decks 
    return(
      <View style={styles.card}>
        <Text style={styles.cardText}>{decks[deck].title}</Text>
        <Text style={styles.cardText}>{`Q: ${decks[deck].questions.length}`}</Text>
        <ActionButton styles={styles} text={'Add Card'} color={white}
        onPress={() => this.props.navigation.navigate('AddCard', {entryId: deck})} />
        {decks[deck].questions.length > 0 ?
        <ActionButton styles={styles} text={'Quiz'} color={white}
        onPress={() => this.props.navigation.navigate('Quiz', {entryId: deck})} />:
        <View></View>
        }
        

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


export default connect(mapStateToProps)(DeckView)