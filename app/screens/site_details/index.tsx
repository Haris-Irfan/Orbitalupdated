import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import NavigationTab from '@/components/navigation_tab';

const backgroundImage = require('../../../assets/images/VI-SG-IT-UIbackground.png');

interface Params {
  id?: string;
  Name?: string;
  Description?: string;
  OpeningHours?: string;
  Latitude?: number;
  Longitude?: number;
}

export default function SiteDetails() {
  const params = useLocalSearchParams() as Params;
  const router = useRouter();

  const handleNavigateToMap = () => {
    if (params.Latitude !== undefined && params.Longitude !== undefined) {
      const latitude = String(params.Latitude);
      const longitude = String(params.Longitude);
      console.log('Navigating to map with coordinates:', { latitude, longitude });
      router.push({
        pathname: '/map',
        params: {
          latitude,
          longitude,
        },
      });
    } else {
      console.log('Latitude or Longitude is undefined');
    }
  };
  

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.bubble}>
            <Text style={styles.titleHeading}>{params.Name}</Text>
            <Text style={styles.heading}>Description</Text>
            <Text style={styles.content}>{params.Description}</Text>
            <Text style={styles.heading}>Opening Hours</Text>
            <Text style={styles.content}>{params.OpeningHours}</Text>
            <Pressable onPress={handleNavigateToMap} style={styles.link}>
              <Text style={styles.linkText}>View on Map</Text>
            </Pressable>
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
  link: {
    marginTop: 10,
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  navigationTabContainer: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    width: 430,
    left: 215,
  },
});
