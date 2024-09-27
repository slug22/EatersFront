import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';

const MENU_ITEMS = [
    { id: '1', name: 'Soft Taco', price: 10, url: 'https://www.tacobell.com/food/tacos/soft-taco?store=032152' },
    { id: '2', name: 'Crunchy Taco', price: 12, url: 'https://www.tacobell.com/food/tacos/crunchy-taco?store=032152' },
    { id: '3', name: 'Burrito Supreme', price: 8, url: 'https://www.tacobell.com/food/burritos/burrito-supreme?store=032152' },
    { id: '4', name: 'Nachos BellGrande', price: 4, url: 'https://www.tacobell.com/food/nachos/nachos-bellgrande?store=032152' },
  ];

// Function to get the correct localhost URL
const getApiUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000'; // Android emulator
  } else if (Platform.OS === 'ios') {
    return 'http://localhost:3000'; // iOS simulator
  } else {
    return 'http://localhost:3000'; // Web or other platforms
  }
};

export default function OrderScreen({ navigation }) {
  const [order, setOrder] = useState([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const addToOrder = (item) => {
    setOrder([...order, { ...item, orderId: Date.now().toString() }]);
  };

  const removeFromOrder = (orderId) => {
    setOrder(order.filter(item => item.orderId !== orderId));
  };

  const calculateTotal = () => {
    return order.reduce((sum, item) => sum + item.price, 0) + 2; // Adding $2 to the total
  };

  const saveOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/save-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: order,
          total: calculateTotal(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        navigation.navigate('Venmo', { orderId: result.orderId, total: calculateTotal() });
      } else {
        Alert.alert('Error', result.message || 'Failed to save order');
      }
    } catch (error) {
      console.error('Error saving order:', error);
      Alert.alert('Error', 'Failed to save order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text>{item.name} - ${item.price}</Text>
      <TouchableOpacity onPress={() => removeFromOrder(item.orderId)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={MENU_ITEMS}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => addToOrder(item)} style={styles.item}>
            <Text>{item.name} - ${item.price}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.orderSummary}>
        <Text style={styles.orderTitle}>Your Order:</Text>
        <FlatList
          data={order}
          renderItem={renderOrderItem}
          keyExtractor={item => item.orderId}
        />
        <Text style={styles.totalText}>Order Total: ${calculateTotal()} (including $2 fee)</Text>
        <TouchableOpacity 
          onPress={saveOrder} 
          style={[styles.placeOrderButton, isPlacingOrder && styles.disabledButton]}
          disabled={isPlacingOrder || order.length === 0}
        >
          <Text style={styles.buttonText}>
            {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    orderSummary: {
      marginTop: 20,
    },
    orderTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    orderItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    removeButton: {
      backgroundColor: '#FF0000',
      padding: 5,
      borderRadius: 5,
    },
    removeButtonText: {
      color: 'white',
    },
    totalText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    placeOrderButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    disabledButton: {
      backgroundColor: '#A0A0A0',
    },
  });