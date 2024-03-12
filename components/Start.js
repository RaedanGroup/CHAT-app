// ./components/Start.js

import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ImageBackground, Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth, signInAnonymously } from "firebase/auth";


const StartScreen = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#757083');
  const colorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  // Initial top margin and height of the subContainer
  const [subContainerTopMargin, setsubContainerTopMargin] = useState(null);
  const [subContainerHeight, setsubContainerHeight] = useState('44%');

  // Add listeners to the keyboard to adjust the subContainer when the keyboard is shown or hidden for Android
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (Platform.OS === 'android') {
        setsubContainerTopMargin(150);
        setsubContainerHeight(400)
      }
    });

    // Add listener to keyboardDidHide event to restore the subContainer to originial state when the keyboard is hidden
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setsubContainerTopMargin(null);
      setsubContainerHeight('44%')
    });

    // Clean up listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        const user = result.user;
        // If there's a user logged in, navigate to ChatScreen
        navigation.navigate('ChatScreen', {
          userId: user.uid, // User's id
          name: name, // User's name entered in the TextInput
          color: color, // Selected background color
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  return (
    <ImageBackground source={require('../assets/Background-Image.png')} style={styles.backgroundImage}>
      {/* Add KeyboardAvoidingView to handle the keyboard for iOS */}
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined} 
        keyboardVerticalOffset={Platform.OS === "ios" ? -160 : 0}
      >
        <Text style={styles.title}>Native Chat</Text>
        {/* Add a view to push the subContainer to the bottom of the screen */}
        <View style={{flexGrow: 1}}></View>
        {/* Add dynamic styles to the subContainer based on keyboard events */}
        <View style={[styles.subContainer, { marginTop: subContainerTopMargin }, { height: subContainerHeight}]}> 
          <View style={styles.inputContainer}>
            {/* Add the icon for the textbox */}
            <Icon name="person-outline" size={28} color="#757083" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />
          </View>
          {/* Add the color selector buttons */}
          <View style={styles.colorContainer}>
            <Text style={styles.label}>Choose background color:</Text>
            <FlatList // Use FlatList to display the color options for the option to add many more
              style={styles.colorSamples}
              data={colorOptions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.colorOption, { backgroundColor: item }]}
                  onPress={() => setColor(item)}
                ></TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              horizontal={true} // Display the color options horizontally
              scrollEnabled={false} // Disable the scroll function since the list is short
            />
          </View>
          <TouchableOpacity // Add the start chatting button and pass the name and color to the ChatScreen
            style={[styles.button, { backgroundColor: color }]}
            onPress={signInUser}
            accessible={true} // Add accessibility to the button
            accessibilityLabel="Start chatting"
            accessibilityHint="Navigates to the chat screen"
            accessibilityRole='button'
          >
            <Text style={styles.buttonText}>Start chatting</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '6%',
  },
  title: {
    marginTop: '30%',
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
  },
  subContainer: {
    height: '44%',
    width: '100%',
    padding: '6%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: Platform.select({ ios: 30, android: 0 }), // Add margin bottom for iOS
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#757083',
    borderRadius: 5,
    paddingLeft: 10, // Add some padding to the left of the icon
    opacity: 0.5,
  },
  inputIcon: {
    marginRight: 5, // Space between icon and TextInput
  },
  textInput: {
    flex: 1, // Ensures TextInput fills the remaining space
    padding: 10,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    paddingVertical: 20,
  },
  colorContainer: {
    width: '100%',
    position: 'absolute',
    top: '43%',
    left: '6%',
  },
  label: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
  },
  colorSamples: {
    width: '100%',
    marginVertical: 15,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 60,
    position: 'absolute',
    left: '6%',
    bottom: '6%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default StartScreen;
