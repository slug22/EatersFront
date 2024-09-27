import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import OrderScreen from './screens/OrderScreen';
import VenmoScreen from './screens/VenmoScreen';
import AuthCodeScreen from './screens/AuthCodeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Order') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Venmo') {
              iconName = focused ? 'card' : 'card-outline';
            } else if (route.name === 'Auth') {
              iconName = focused ? 'key' : 'key-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Order" component={OrderScreen} />
        <Tab.Screen name="Venmo" component={VenmoScreen} />
        <Tab.Screen name="Auth" component={AuthCodeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}