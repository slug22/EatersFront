import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AuthCodeScreen() {
  const [authCode, setAuthCode] = useState('');

  useEffect(() => {
    // Generate a random 3-digit code
    const newCode = Math.floor(100 + Math.random() * 900).toString();
    setAuthCode(newCode);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication Code</Text>
      <Text style={styles.code}>{authCode}</Text>
      <Text style={styles.instructions}>
        Use this code to pick up your order. This code will change for each new order.
      </Text>
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
  },
});