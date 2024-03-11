// ./components/Chat.js

import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
// import GiftedChat and Bubble
import { GiftedChat, Bubble,InputToolbar } from "react-native-gifted-chat";
// import the firestore functions
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp  } from "firebase/firestore";
// import AsyncStorage to cache messages
import AsyncStorage from "@react-native-async-storage/async-storage";
// import the CustomActions component to handle the image picker, camera, and location
import CustomActions from './CustomActions';


// Create the ChatScreen component
const ChatScreen = ({ route, navigation, db, isConnected }) => {
  const { userId, name, color } = route.params;
  const [messages, setMessages] = useState([]);
  
  // Load cached messages from AsyncStorage
  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem("messages");
      setMessages(JSON.parse(cachedMessages) || []);
    } catch (error) {
      // If there is an error, log the error message
      console.log("Failed to load messages from cache", error.message);
    }
  };

  // makes unsubscribe available to the whole component
  let unsubscribe;

  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed.
      if (unsubscribe) unsubscribe();
      unsubscribe = null;
      // Get the messages collection
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, orderBy("createdAt", "desc"));
      // use onSnapshot() to listen for changes to the messages collection
      unsubscribe = onSnapshot(q, async (snapshot) => {
        // Get the messages from the snapshot
        const firebaseMessages = snapshot.docs.map(doc => ({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(), // Fallback to new Date if null
          user: doc.data().user,
        }));
        cacheMessages(firebaseMessages);
        setMessages(firebaseMessages);
      });
    // Load cached messages if there is no network connection
    } else loadCachedMessages();
  
    return () => {
      // Clean up on unmount
      if (unsubscribe) unsubscribe();
    };
  }, [isConnected]); // Re-run the effect when the network status changes

  const cacheMessages = async (messageCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messageCache));
    } catch (error) {
      console.log(error.message);
    }
  };

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

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

  const renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

 return (
  <View style={[styles.container, { backgroundColor: color }]}>
    <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderActions={renderCustomActions}
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