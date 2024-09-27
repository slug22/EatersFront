import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const MENU_ITEMS = [
  { id: '1', name: 'Burger', price: 10 },
  { id: '2', name: 'Pizza', price: 12 },
  { id: '3', name: 'Salad', price: 8 },
  { id: '4', name: 'Fries', price: 4 },
];

export default function OrderScreen({ navigation }) {
  const [order, setOrder] = useState([]);

  const addToOrder = (item) => {
    setOrder([...order, { ...item, orderId: Date.now().toString() }]);
  };

  const removeFromOrder = (orderId) => {
    setOrder(order.filter(item => item.orderId !== orderId));
  };

  const calculateTotal = () => {
    return order.reduce((sum, item) => sum + item.price, 0) + 2; // Adding $2 to the total
  };

  const placeOrder = () => {
    // In a real app, you'd send the order to a backend here
    navigation.navigate('Venmo', { total: calculateTotal() });
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
        <TouchableOpacity onPress={placeOrder} style={styles.placeOrderButton}>
          <Text style={styles.buttonText}>Place Order</Text>
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
});
