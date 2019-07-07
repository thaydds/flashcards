import React from 'react';
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'
import {pink, white} from './utils/colors'  
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
 
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <DeckList />
//     </View>
//   );
// }

const HomeStack = createStackNavigator({
  Home:{
    screen: DeckList,
    navigationOptions: {
      title: 'FlashCards',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: '#2196F3',
      },
      // headerTitleStyle: {
      //   textAlign: 'center',
      //   flex:1,
      //   justifyContent: 'center',
      //   alignItems: 'center' 
      // }
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: 'Deck Info',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: '#2196F3',
      },  
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: '#2196F3',
      },  
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: '#2196F3',
      },  
    }
  },
});

const AddDeckStack = createStackNavigator({
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'Add Deck',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: '#2196F3'
      }
    }
  },
});


const AppNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    AddDeck: AddDeckStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'md-home'

          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
        } else if (routeName === 'AddDeck') {
          iconName = `md-card`;
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);

export default createAppContainer(AppNavigator);



