import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';
import NavigationTab from '@/components/navigation_tab';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const GOOGLE_MAPS_APIKEY = 'AIzaSyArze3aJ4Ls04x8LWeUBP1OQk5S6-4qKdI';

const Map: React.FC = () => {
  const initialRegion: Region = {
    latitude: 1.3521, 
    longitude: 103.8198,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [region, setRegion] = useState<Region>(initialRegion);
  const [origin, setOrigin] = useState<Coordinates | null>(null);
  const [destination, setDestination] = useState<Coordinates | null>(null);
  const params = useLocalSearchParams() as { latitude?: string; longitude?: string };

  const [markers] = useState([
    {
      id: '1',
      title: 'Sultan Mosque',
      description: '3 Muscat St, Singapore 198833',
      coordinates: { latitude: 1.3023, longitude: 103.8590 },
    },
    {
      id: '2',
      title: 'Fort Siloso',
      description: 'Siloso Rd, Singapore 099981',
      coordinates: { latitude: 1.2594, longitude: 103.8086 },
    },
    {
      id: '3',
      title: 'St. Andrews Cathedral',
      description: '11 St. Andrews Rd, Singapore 178959',
      coordinates: { latitude: 1.2924, longitude: 103.8523 },
    },
    {
      id: '4',
      title: 'Lao Pa Sat',
      description: '16 Raffles Quay, Singapore 048582',
      coordinates: { latitude: 1.2805, longitude: 103.8504 },
    },
    {
      id: '5',
      title: 'National Museum of Singapore',
      description: '93 Stamford Rd, Singapore 178897',
      coordinates: { latitude: 1.2966, longitude: 103.8285 },
    },
    {
      id: '6',
      title: 'Thian Hock Keng',
      description: '158 Telok Ayer St, Singapore 068613',
      coordinates: { latitude: 1.2809, longitude: 103.8476 } 
    }
  ]);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const userRegion: Coordinates = {
        latitude,
        longitude,
      };
      setOrigin(userRegion);
      setRegion(prevRegion => ({
        ...prevRegion,
        latitude: userRegion.latitude,
        longitude: userRegion.longitude,
      }));
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (params.latitude && params.longitude) {
      const latitude = parseFloat(params.latitude);
      const longitude = parseFloat(params.longitude);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        const destCoordinates: Coordinates = {
          latitude,
          longitude,
        };
        setDestination(destCoordinates);
        setRegion(prevRegion => ({
          ...prevRegion,
          latitude: destCoordinates.latitude,
          longitude: destCoordinates.longitude,
        }));
      } else {
        Alert.alert('Invalid coordinates');
      }
    }
  }, [params.latitude, params.longitude]);

  const handleMarkerPress = (coordinates: Coordinates) => {
    setDestination(coordinates);
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinates}
              title={marker.title}
              description={marker.description}
              onPress={() => handleMarkerPress(marker.coordinates)}
            />
          ))}
          {origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          )}
        </MapView>
      )}
      <View style={styles.navigationTabContainer}>
        <NavigationTab />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  navigationTabContainer: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    width: 430,
    left: 215,
  },
});

export default Map;
