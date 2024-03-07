import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ImageBackground, Platform, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StartScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#757083');
  const colorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  // Initial bottom padding and height of the subContainer
  const [subContainerBottom, setsubContainerBottom] = useState('6%');
  const [subContainerHeight, setsubContainerHeight] = useState('44%');

  // Add listeners to the keyboard to adjust the subContainer when the keyboard is shown or hidden based on the platform
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (Platform.OS === 'android') {
        setsubContainerBottom(0);
        setsubContainerHeight('80%')
      } else {
        if (Platform.OS === 'ios') {
          setsubContainerBottom('20%');
        }
      }
    });

    // Add listener to keyboardDidHide event to restore the subContainer to originial state when the keyboard is hidden
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setsubContainerBottom('6%');
      setsubContainerHeight('44%')
    });

    // Clean up the listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  
  return (
    <ImageBackground source={require('../assets/Background-Image.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Native Chat</Text>
        {/* Add dynamic styles to the subContainer based on keyboard events */}
        <View style={[styles.subContainer, { bottom: subContainerBottom }, { height: subContainerHeight}]}>
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
            onPress={() => navigation.navigate('ChatScreen', { name: name, color: color})}
          >
            <Text style={styles.buttonText}>Start chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '6%',
  },
  title: {
    position: 'absolute',
    top: '15%',
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
  },
  subContainer: {
    position: 'absolute',
    height: '44%',
    width: '100%',
    padding: '6%',
    backgroundColor: '#fff',
    borderRadius: 5,
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
