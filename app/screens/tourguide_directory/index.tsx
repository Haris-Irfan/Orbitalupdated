import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Pressable, View, Text, StyleSheet, ImageBackground } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';  
import { useRouter } from 'expo-router';
import { RootStackParamList } from '../../types';  
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import NavigationTab from '@/components/navigation_tab';

const backgroundImage = require('../../../assets/images/VI-SG-IT-UIbackground.png');

type TourGroupsNavigationProp = StackNavigationProp<RootStackParamList, 'tourguide_details'>;

type TourGroup = {
  id: string;
  name: string;
  description: string;
  rate: string;
};

export default function TourGroups() {
  const [tourGroups, setTourGroups] = useState<TourGroup[]>([]);
  const router = useRouter();
  const navigation = useNavigation<TourGroupsNavigationProp>();

  useEffect(() => {
    const fetchTourGroups = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tourgroups'));
        const tourGroupsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          rate: doc.data().rate,
        })) as TourGroup[];
        setTourGroups(tourGroupsData);
      } catch (error) {
        console.error("Error fetching tour groups: ", error);
      }
    };

    fetchTourGroups();
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.directory}>Tour Groups</Text>
        </View>
        <ScrollView contentContainerStyle={styles.catalogContainer}>
          {tourGroups.map(tourGroup => (
            <Pressable
              key={tourGroup.id}
              style={styles.placeCard}
              onPress={() => navigation.navigate('tourguide_details', {
                id: tourGroup.id,
                name: tourGroup.name,
                description: tourGroup.description,
                rate: tourGroup.rate,
              })}
            >
              <FontAwesome6 name='users' style={styles.placeImage} size={40} />
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>{tourGroup.name}</Text>
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
