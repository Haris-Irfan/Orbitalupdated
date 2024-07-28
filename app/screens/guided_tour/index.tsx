import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function GuidedTour() {
  const { data: qrCodeData } = useLocalSearchParams();

  // Define the sections and details for the guided tour
  const sections: { [key: string]: string } = {
    home: 'Details about home...',
    main_hall: 'Details about main hall...',
    garden: 'Details about garden...',
  };

  const sectionKeys = Object.keys(sections) as Array<keyof typeof sections>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Where are you now?</Text>
      {sectionKeys.map((section) => (
        <TouchableOpacity key={section} style={styles.section}>
          <Text style={styles.sectionTitle}>{(section as string).replace('_', ' ')}</Text>
          <Text style={styles.sectionContent}>{sections[section]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    marginTop: 10,
  },
});
