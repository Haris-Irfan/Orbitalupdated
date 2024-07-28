import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import NavigationTab from '@/components/navigation_tab';

const backgroundImage = require('../../../assets/images/VI-SG-IT-UIbackground.png');

interface Params {
  id?: string;
  eventName?: string;
  description?: string;
  location?: string;
  time?: string;
}

export default function EventDetails() {
  const params = useLocalSearchParams() as Params;

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.bubble}>
            <Text style={styles.titleHeading}>{params.eventName}</Text>
            <Text style={styles.heading}>Description</Text>
            <Text style={styles.content}>{params.description}</Text>
            <Text style={styles.heading}>Location</Text>
            <Text style={styles.content}>{params.location}</Text>
            <Text style={styles.heading}>Time</Text>
            <Text style={styles.content}>{params.time}</Text>
          </View>
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
  navigationTabContainer: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    width: 430,
    left: 215,
  },
});
