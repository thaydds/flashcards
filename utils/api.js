import { AsyncStorage } from 'react-native'
const FLASHCARDS_STORAGE_KEY = 'flashcards: decks'

const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'React is better than Vue?',
        answer: 'Yes, so much better',
        correctAnswer: 'true'
      },
      {
        question: 'React is better than Node?',
        answer: 'No, Its equal better',
        correctAnswer: 'false'
      },
    ]
  },
  Redux: {
    title: 'Redux',
    questions: [
      {
        question: 'Redux is aways a good choice?',
        answer: 'No, neither aways',
        correctAnswer: 'false'
      },
      {
        question: 'Redux is dificult?',
        answer: 'Yes, inst easy',
        correctAnswer: 'true'
      },
    ]
  },
}

export const getData = () => initialData 

export const getDecks = async (deck) => {
  const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (results === null) {
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  else {
    return JSON.parse(results);
  }
}

export const saveDeckTitle = async (title) => AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
  [title]: {
    title: title,
    questions: []
  }
}))

export const addCardToDeck = async (name, card) => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then(results => JSON.parse(results))
  .then(results => {
    results[name].questions.push(card)
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results))
    return results
  })
}