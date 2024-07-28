import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const backgroundImage = require('../../../assets/images/VI-SG-IT-UIbackground.png');

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const router = useRouter();

  const goBack = () => {
    router.back(); 
  };

  useEffect(() => {
    const collectionRef = collection(db, 'chats', 'chatId', 'messages'); // Adjust path as needed
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })) as IMessage[]
      );
    });

    return () => {
      setMessages([]); // Clear messages when the component is unmounted
      unsubscribe();
    };
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, 'chats', 'chatId', 'messages'), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <AntDesign name="close" size={24} style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Chat with Organization</Text>
        </View>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: auth.currentUser?.uid || '',
            name: auth.currentUser?.displayName || auth.currentUser?.email || 'User',
          }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'darkorange',
  },
  closeIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Chat;
