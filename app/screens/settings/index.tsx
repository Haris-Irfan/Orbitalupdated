import React from 'react';
import { View, Text, Alert, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { auth } from '../../../firebaseConfig';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationTab from '@/components/navigation_tab';

const backgroundImage = require('../../../assets/images/VI-SG-IT-UIbackground.png');

const Settings = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert("Signed Out", "You have been signed out successfully.");
      router.replace('/login_page'); // Redirect to the login page
    } catch (error) {
      Alert.alert("Error", "Failed to sign out.");
    }
  };

  const handleResetPassword = async () => {
    const email = auth.currentUser?.email;
    if (!email) {
      Alert.alert("Error", "No email found for the current user.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Password Reset", "A password reset email has been sent to your email address.");
    } catch (error) {
      Alert.alert("Error", "Failed to send password reset email.");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.directory}>Settings</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </Pressable>
        </View>
        <NavigationTab />
      </SafeAreaView> 
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 30
  },
  button: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 15,
    backgroundColor: 'paleturquoise',
    borderRadius: 5,
    shadowColor: '#006',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;
