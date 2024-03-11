// ./App.js

import { StyleSheet, Alert } from 'react-native';
import { useEffect } from 'react';
// import the screens
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import firestore database from firebaseConfig
import { db } from './components/firebaseConfig';
// import the useNetInfo hook to check for network status
import { useNetInfo }from '@react-native-community/netinfo';
// import the firestore functions to enable and disable the network
import { disableNetwork, enableNetwork } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Get the network status
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

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
            {/* Pass the db object and connection status to the ChatScreen */}
            {props => <ChatScreen {...props} db={db} isConnected={connectionStatus.isConnected} />}
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