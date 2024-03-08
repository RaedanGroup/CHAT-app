import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const ChatScreen = ({ route, navigation }) => {
  const { name } = route.params;
  const { color } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'So. It has come to this.',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
          {
            _id: 2,
            text: `${name} has entered the chat!`,
            createdAt: new Date(),
            system: true,
          },
        ]);
      }, []);

      const onSend = (newMessages) => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
          }

          const renderBubble = (props) => {
            return <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "#000"
                },
                left: {
                  backgroundColor: "#FFF"
                }
              }}
            />
          }

 return (
  <View style={[styles.container, { backgroundColor: color }]}>
  <GiftedChat
    messages={messages}
    renderBubble={renderBubble}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1
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