import React, { useState, useEffect } from 'react';
import { ScrollView, Pressable, View, Text, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useRouter } from 'expo-router';
import { RootStackParamList } from '../app/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type SiteDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'site_details'>;

type Place = {
  id: string;
  Name: string;
  Description: string;
  OpeningHours: string;
  Latitude: number;
  Longitude: number;
};

export default function Catalogue() {
  const [places, setPlaces] = useState<Place[]>([]);
  const router = useRouter();
  const navigation = useNavigation<SiteDetailsNavigationProp>();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'siteDetails'));
        const placesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          Name: doc.data().Name,
          Description: doc.data().Description,
          OpeningHours: doc.data().OpeningHours,
          Latitude: doc.data().latitude,
          Longitude: doc.data().longitude,
        })) as Place[];
        setPlaces(placesData);
      } catch (error) {
        console.error("Error fetching places: ", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.catalogContainer}>
      {places.map(place => (
        <Pressable
          key={place.id}
          style={styles.placeCard}
          onPress={() => navigation.navigate('site_details', {
            id: place.id,
            Name: place.Name,
            Description: place.Description,
            OpeningHours: place.OpeningHours,
            Latitude: place.Latitude,
            Longitude: place.Longitude,
          })}
        >
          <FontAwesome6 name='landmark-dome' style={styles.placeImage} size={40} />
          <View style={styles.placeInfo}>
            <Text style={styles.placeName}>{place.Name}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
