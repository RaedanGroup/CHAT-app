import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ChatScreen = ({ route, navigation }) => {
  const { name } = route.params;
  const { color } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

 return (
   <View style={[styles.container, { backgroundColor: color }]}>
     <Text style={styles.text}>Welcome {name}!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#000',
    padding: 10,
    borderWidth: 3,
    borderColor: '#fff'
  },
});

export default ChatScreen;