import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, ImageBackground } from 'react-native';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../AuthContext';

const backgroundImage = require('../assets/images/VI-SG-IT-UIbackground.png');
  
const NewPostModal = ({ visible, onClose, onPostAdded }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = async () => {
    if (!user) return;

    await addDoc(collection(db, 'posts'), {
      title,
      content,
      author: {
        uid: user.uid,
        username: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        email: user.email || ''
      },
      likes: [],
      dislikes: [],
      timestamp: Timestamp.fromDate(new Date()),
      comments: []
    });

    setTitle('');
    setContent('');
    onPostAdded();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
        />
        <Button title="Add Post" onPress={handleAddPost} />
        <Button title="Cancel" onPress={onClose} />
      </View>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: 'white'
  },
});

export default NewPostModal;
