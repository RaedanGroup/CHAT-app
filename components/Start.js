import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ImageBackground } from 'react-native';

const StartScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const colorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  return (
    <ImageBackground source={require('../assets/Background-Image.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Native Chat</Text>
        <View style={styles.subContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Type your username here"
          />
          <View style={styles.colorContainer}>
            <Text style={styles.label}>Choose background color:</Text>
            <FlatList
              style={styles.colorSamples}
              data={colorOptions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.colorOption, { backgroundColor: item }]}
                  onPress={() => console.log("Selected color: ", item)}
                />
              )}
              keyExtractor={(item) => item}
              horizontal
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ChatScreen', { name: name })}
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
    position: 'absolute', // Position title absolutely within its parent
    top: '15%',
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
  },
  subContainer: {
    position: 'absolute',
    height: '44%',
    width: '100%',
    bottom: '6%',
    backgroundColor: '#fff',
    padding: '6%',
  },
  textInput: {
    width: '100%', // Adjust width to fill subContainer
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#757083',
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
  },
  colorContainer: {
    width: '100%',
    position: 'absolute',
    top: '45%',
    left: '6%',
  },
  label: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    // alignItems: 'flex-start'
  },
  colorSamples: {
    width: '100%', // Adjust width to fill subContainer
    marginVertical: 15,
    // alignContent: 'flex-start',
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 60,
    position: 'absolute',
    left: '6%',
    bottom: '6%',
    backgroundColor: '#757083',
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
