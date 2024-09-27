import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

export default function VenmoScreen({ route }) {
  const { total } = route.params;
  const venmoUsername = 'Simon-Gage-2'; // Replace with your actual Venmo username

  const openVenmoProfile = () => {
    const venmoUrl = `https://venmo.com/${venmoUsername}`;
    Linking.openURL(venmoUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.total}>Total: ${total}</Text>
      <Text style={styles.instruction}>
        Click the button below to go to the Venmo profile. 
        Please manually enter the amount of ${total} when sending payment.
      </Text>
      <TouchableOpacity onPress={openVenmoProfile} style={styles.payButton}>
        <Text style={styles.buttonText}>Go to Venmo Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    marginBottom: 20,
  },
  instruction: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  payButton: {
    backgroundColor: '#3D95CE',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});