// ./components/Chat.js

import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
// import GiftedChat and Bubble
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
// import the firestore functions
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp  } from "firebase/firestore";
// import AsyncStorage to cache messages
import AsyncStorage from "@react-native-async-storage/async-storage";
// import the CustomActions component to handle the image picker, camera, and location
import CustomActions from './CustomActions';
// import MapView to display the location in the chat
import MapView from 'react-native-maps';


// Create the ChatScreen component
const ChatScreen = ({ route, navigation, db, isConnected, storage }) => {
  const { userId, name, color } = route.params;
  const [messages, setMessages] = useState([]);
  
  // makes unsubscribe available to the whole component
  let unsubscribe;

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

  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      if (unsubscribe) unsubscribe();
      unsubscribe = null;
      const messagesRef = collection(db, "messages");
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const firebaseMessages = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            ...data, // Spread all fields from the document data
            createdAt: new Date(doc.data().createdAt.toMillis())
          };
        });
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

  // Add messages to Firestore
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  // Render a custom chat bubble
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#0084ff" },
        left: { backgroundColor: "#e6e6e6" },
      }}
      accessible={true}
      accessibilityLabel="Message Bubble"
      accessibilityHint={`Message from ${props.currentMessage.user.name}`}
    />
  );

  // Render the input toolbar only if the user is connected
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

  // Render the custom actions (image picker, camera, location)
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // Render the custom view for the MapView
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 6 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        />
      );
    }
    return null;
  };

 return (
  <View style={[styles.container, { backgroundColor: color }]}>
    <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderActions={renderCustomActions}
      renderCustomView={renderCustomView}
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