import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp  } from "firebase/firestore";

const ChatScreen = ({ route, navigation, db }) => {
  const { userId, name, color } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name });
 
  const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const firebaseMessages = snapshot.docs.map(doc => ({
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(), // Fallback to new Date if null
        user: doc.data().user,
      }));
      setMessages(firebaseMessages);
    });
  
    return () => unsubscribe(); // Clean up on unmount
  }, []);  

  const onSend = (newMessages = []) => {
    const messageToAdd = { ...newMessages[0], createdAt: serverTimestamp() };
    addDoc(collection(db, "messages"), messageToAdd)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  const renderBubble = (props) => {
    return <Bubble {...props} wrapperStyle={{
      right: {
        backgroundColor: "#000"
      },
      left: {
        backgroundColor: "#FFF"
      }
    }}/>
  }

 return (
  <View style={[styles.container, { backgroundColor: color }]}>
  <GiftedChat
    messages={messages}
    renderBubble={renderBubble}
    onSend={messages => onSend(messages)}
    user={{
      _id: userId, // Use the extracted 'userId' for _id
      name: name, // Use the extracted 'name'
    }}
  />
  { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
</View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;