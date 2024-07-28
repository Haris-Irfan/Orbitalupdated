import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ImageBackground } from 'react-native';
import { db } from '../../../firebaseConfig';
import { useAuth } from '../../../AuthContext';
import { Timestamp, collection, getDocs, doc, updateDoc, arrayUnion, addDoc, getDoc, setDoc } from 'firebase/firestore';
import NavigationTab from '@/components/navigation_tab';
import { FloatingAction } from "react-native-floating-action";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NewPostModal from '@/components/newpost';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    uid: string;
    username: string;
    email: string;
  };
  likes: string[];
  dislikes: string[];
  timestamp: Timestamp;
  comments: {
    id: string;
    comment: string;
    user: {
      uid: string;
      username: string;
      email: string;
    };
    timestamp: Timestamp;
    likes: string[];
    dislikes: string[];
  }[];
}

const backgroundImage = require('../../../assets/images/VI-SG-IT-UIbackground.png');

export default function Forum() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, 'posts'));
    const postsList = await Promise.all(snapshot.docs.map(async doc => {
      const data = doc.data();
      const authorSnapshot = await getDocs(collection(db, 'posts', doc.id, 'author'));
      const authorData = authorSnapshot.docs[0]?.data();
      const commentsSnapshot = await getDocs(collection(db, 'posts', doc.id, 'comments'));
      const commentsData = await Promise.all(commentsSnapshot.docs.map(async commentDoc => {
        const commentData = commentDoc.data();
        const userSnapshot = await getDocs(collection(db, 'posts', doc.id, 'comments', commentDoc.id, 'user'));
        const userData = userSnapshot.docs[0]?.data();
        return {
          ...commentData,
          user: userData,
          id: commentDoc.id,
          likes: commentData.likes || [],
          dislikes: commentData.dislikes || [],
        };
      }));
      return {
        ...data,
        id: doc.id,
        title: data.title,
        content: data.content,
        timestamp: data.timestamp,
        author: authorData,
        likes: data.likes || [],
        dislikes: data.dislikes || [],
        comments: commentsData,
      };
    }));
    setPosts(postsList as Post[]);
    setFilteredPosts(postsList as Post[]);
  };

  const handleLike = async (postId: string) => {
    if (!user) return;

    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);
    const likes = postDoc.data()?.likes || [];
    const dislikes = postDoc.data()?.dislikes || [];

    if (likes.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: likes.filter((uid: string) => uid !== user.uid)
      });
    } else if (dislikes.includes(user.uid)) {
      await updateDoc(postRef, {
        dislikes: dislikes.filter((uid: string) => uid !== user.uid),
        likes: arrayUnion(user.uid)
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid)
      });
    }
    fetchPosts();
  };

  const handleDislike = async (postId: string) => {
    if (!user) return;

    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);
    const likes = postDoc.data()?.likes || [];
    const dislikes = postDoc.data()?.dislikes || [];

    if (dislikes.includes(user.uid)) {
      await updateDoc(postRef, {
        dislikes: dislikes.filter((uid: string) => uid !== user.uid)
      });
    } else if (likes.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: likes.filter((uid: string) => uid !== user.uid),
        dislikes: arrayUnion(user.uid)
      });
    } else {
      await updateDoc(postRef, {
        dislikes: arrayUnion(user.uid)
      });
    }
    fetchPosts();
  };

  const handleComment = async (postId: string) => {
    if (!user) return;

    const postRef = doc(db, 'posts', postId);
    const commentDocRef = await addDoc(collection(postRef, 'comments'), {
      comment: commentText,
      timestamp: Timestamp.fromDate(new Date()),
      likes: [],
      dislikes: []
    });

    await setDoc(doc(postRef, 'comments', commentDocRef.id, 'user', user.uid), {
      uid: user.uid,
      username: user.displayName || user.email?.split('@')[0] || 'Anonymous',
      email: user.email || ''
    });

    setCommentText('');
    fetchPosts();
  };

  const handleCommentLike = async (postId: string, commentId: string) => {
    if (!user) return;

    const postRef = doc(db, 'posts', postId);
    const commentRef = doc(postRef, 'comments', commentId);
    const commentDoc = await getDoc(commentRef);

    const likes = commentDoc.data()?.likes || [];
    const dislikes = commentDoc.data()?.dislikes || [];

    if (likes.includes(user.uid)) {
      await updateDoc(commentRef, {
        likes: likes.filter((uid: string) => uid !== user.uid)
      });
    } else if (dislikes.includes(user.uid)) {
      await updateDoc(commentRef, {
        dislikes: dislikes.filter((uid: string) => uid !== user.uid),
        likes: arrayUnion(user.uid)
      });
    } else {
      await updateDoc(commentRef, {
        likes: arrayUnion(user.uid)
      });
    }
    fetchPosts();
  };

  const handleCommentDislike = async (postId: string, commentId: string) => {
    if (!user) return;

    const postRef = doc(db, 'posts', postId);
    const commentRef = doc(postRef, 'comments', commentId);
    const commentDoc = await getDoc(commentRef);

    const likes = commentDoc.data()?.likes || [];
    const dislikes = commentDoc.data()?.dislikes || [];

    if (dislikes.includes(user.uid)) {
      await updateDoc(commentRef, {
        dislikes: dislikes.filter((uid: string) => uid !== user.uid)
      });
    } else if (likes.includes(user.uid)) {
      await updateDoc(commentRef, {
        likes: likes.filter((uid: string) => uid !== user.uid),
        dislikes: arrayUnion(user.uid)
      });
    } else {
      await updateDoc(commentRef, {
        dislikes: arrayUnion(user.uid)
      });
    }
    fetchPosts();
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(text.toLowerCase()) ||
        post.content.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  const handleAddPost = () => {
    setModalVisible(true);
  };

  const handlePostAdded = () => {
    fetchPosts();
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
          <Text style={styles.directory}>Forum</Text>
      </View>
        <View style={styles.container}>
          <TextInput
            style={styles.searchBox}
            placeholder="Search..."
            value={searchText}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredPosts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postContent}>{item.content}</Text>
                <View style={styles.reactionContainer}>
                  <TouchableOpacity onPress={() => handleLike(item.id)}>
                    <Text style={styles.like}>Like ({item.likes.length})</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDislike(item.id)}>
                    <Text style={styles.dislike}>Dislike ({item.dislikes.length})</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.commentBox}
                  placeholder="Add a comment..."
                  value={commentText}
                  onChangeText={setCommentText}
                  onSubmitEditing={() => handleComment(item.id)}
                />
                {item.comments.map((comment, index) => (
                  <View key={index} style={styles.comment}>
                    <Text style={styles.commentUser}>{comment.user.username}</Text>
                    <Text>{comment.comment}</Text>
                    <Text style={styles.commentTimestamp}>{new Date(comment.timestamp.seconds * 1000).toLocaleString()}</Text>
                    <View style={styles.reactionContainer}>
                      <TouchableOpacity onPress={() => handleCommentLike(item.id, comment.id)}>
                        <Text style={styles.like}>Like ({comment.likes.length})</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleCommentDislike(item.id, comment.id)}>
                        <Text style={styles.dislike}>Dislike ({comment.dislikes.length})</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          />
          <FloatingAction
            floatingIcon={<FontAwesome name="plus" size={24} color="white" />}
            onPressMain={handleAddPost}
            position="right"
            distanceToEdge={{ vertical: 105, horizontal: 16 }} 
          />
          <NewPostModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onPostAdded={handlePostAdded}
          />
          <View style={styles.navigationTabContainer}>
            <NavigationTab />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'darkorange',
    shadowColor: '#006',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  directory: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: 'white'
  },
  postContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'paleturquoise',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  like: {
    color: 'green',
  },
  dislike: {
    color: 'red',
  },
  commentBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  comment: {
    fontSize: 14,
    paddingLeft: 8,
    paddingVertical: 4,
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    marginBottom: 4,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentTimestamp: {
    fontSize: 12,
    color: 'gray',
  },
  navigationTabContainer: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    width: 430,
    left: 215
  },
});
