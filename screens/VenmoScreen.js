import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Alert, Platform } from 'react-native';

const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:3000';
  } else if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000'; // This is the special IP for Android emulator to access host machine
  } else {
    return 'http://localhost:3000'; // For iOS simulator
  }
};

export default function VenmoScreen({ route, navigation }) {
  const { orderId, total } = route.params;
  const venmoUsername = 'Simon-Gage-2'; // Replace with your actual Venmo username
  const [isConfirming, setIsConfirming] = useState(false);

  const openVenmoProfile = () => {
    const venmoUrl = `https://venmo.com/${venmoUsername}`;
    Linking.openURL(venmoUrl);
  };

  const confirmPayment = async () => {
    setIsConfirming(true);
    const apiUrl = getApiUrl();
    console.log('Attempting to confirm payment at:', apiUrl);

    try {
      const response = await fetch(`${apiUrl}/api/confirm-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = JSON.parse(responseText);
      console.log('Payment confirmation result:', result);

      Alert.alert('Success', result.message);

      // Always navigate to AuthCodeScreen, passing either the passkey or orderId
      navigation.navigate('Auth', { 
        passkey: result.passkey, 
        orderId: orderId 
      });
    } catch (error) {
      console.error('Error confirming payment:', error);
      Alert.alert('Error', `Failed to confirm payment: ${error.message}`);
    } finally {
      setIsConfirming(false);
    }
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
      <TouchableOpacity 
        onPress={confirmPayment}
        style={[styles.confirmButton, isConfirming && styles.disabledButton]}
        disabled={isConfirming}
      >
        <Text style={styles.buttonText}>
          {isConfirming ? 'Confirming...' : 'Confirm Payment'}
        </Text>
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
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});