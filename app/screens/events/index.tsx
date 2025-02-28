import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Pressable, View, Text, StyleSheet, ImageBackground } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';  
import { useRouter } from 'expo-router';
import { RootStackParamList } from '../../types';  
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import NavigationTab from '@/components/navigation_tab';

const backgroundImage = require('../../../assets/images/VI-SG-IT-UIbackground.png');

type EventsNavigationProp = StackNavigationProp<RootStackParamList, 'event_details'>;

type Event = {
  id: string;
  eventName: string;
  location: string;
  description: string;
  time: string;
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();
  const navigation = useNavigation<EventsNavigationProp>();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          eventName: doc.data().eventName,
          location: doc.data().location,
          description: doc.data().description,
          time: doc.data().time,
        })) as Event[];
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const newEvent = change.doc.data() as Event;
          triggerNotification(newEvent);
        }
      });
    });

    return () => unsubscribe();
  }, []);

  const triggerNotification = async (event: Event) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Event Added",
        body: `${event.eventName} at ${event.location} on ${event.time}`,
        data: { event },
      },
      trigger: { seconds: 1 },
    });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.directory}>Events</Text>
      </View>
      <ScrollView contentContainerStyle={styles.catalogContainer}>
        {events.map(event => (
          <Pressable
            key={event.id}
            style={styles.placeCard}
            onPress={() => navigation.navigate('event_details', {
              id: event.id,
              eventName: event.eventName,
              location: event.location,
              description: event.description,
              time: event.time,
            })}
          >
            <FontAwesome6 name='calendar-alt' style={styles.placeImage} size={40} />
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{event.eventName}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <NavigationTab/>
    </SafeAreaView>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
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
  catalogContainer: {
    padding: 10,
  },
  placeCard: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 0,
    backgroundColor: 'paleturquoise',
    borderRadius: 5,
    shadowColor: '#006',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: 400,
    height: 75,
  },
  placeImage: {
    padding: 15,
  },
  placeInfo: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
