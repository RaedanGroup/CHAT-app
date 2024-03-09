import { StyleSheet } from 'react-native';
// import the screens
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import firestore database from firebaseConfig
import { db } from './components/firebaseConfig';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Native Chat"
      >
        <Stack.Screen
          name="Native Chat"
          component={StartScreen}
        />
        <Stack.Screen
          name="ChatScreen">
            {/* Pass the db object to the ChatScreen */}
            {props => <ChatScreen {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: '88%',
    borderWidth: 1,
    height: 50,
    padding: 10
  },
  textDisplay: {
    height: 50,
    lineHeight: 50
  }
});

export default App;