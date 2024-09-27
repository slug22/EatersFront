import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AuthCodeScreen({ route }) {
  const { passkey, orderId } = route.params;
  const [authCode, setAuthCode] = useState('');

  useEffect(() => {
    if (passkey) {
      // Use the passkey from the server
      setAuthCode(passkey);
    } else {
      // Generate a random 3-digit code if no passkey is provided
      const newCode = Math.floor(100 + Math.random() * 900).toString().padStart(3, '0');
      setAuthCode(newCode);
    }
  }, [passkey]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication Code</Text>
      <Text style={styles.code}>{authCode}</Text>
      <Text style={styles.instructions}>
        Use this code to pick up your order. This code is unique to your order.
      </Text>
      {orderId && <Text style={styles.orderInfo}>Order ID: {orderId}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  code: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  orderInfo: {
    fontSize: 16,
    color: '#333',
  },
});