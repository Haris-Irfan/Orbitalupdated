import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import NavigationTab from '@/components/navigation_tab';

const backgroundImage = require('../../../assets/images/VI-SG-IT-UIbackground.png');

interface Params {
  id?: string;
  name?: string;
  description?: string;
  rate?: string;
//   organisationId: string;
}

export default function TourGuideDetails() {
  const params = useLocalSearchParams() as Params;
  const router = useRouter();

  const handleChatPress = () => {
    router.push({
      pathname: '/chat',
      params: { orgId: params.id }
    });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.bubble}>
            <Text style={styles.titleHeading}>{params.name}</Text>
            <Text style={styles.heading}>Description</Text>
            <Text style={styles.content}>{params.description}</Text>
            <Text style={styles.heading}>Rate</Text>
            <Text style={styles.content}>{params.rate}</Text>
          </View>
          <Pressable style={styles.chatButton} onPress={handleChatPress}>
            <Text style={styles.chatButtonText}>Chat with Organization</Text>
          </Pressable>
        </ScrollView>
        <View style={styles.navigationTabContainer}>
          <NavigationTab />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: 'paleturquoise',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#006',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: '100%',
    marginBottom: 20,
  },
  titleHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    marginBottom: 15,
  },
  chatButton: {
    backgroundColor: 'tomato',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  chatButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navigationTabContainer: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    width: 430,
    left: 215,
  },
});
