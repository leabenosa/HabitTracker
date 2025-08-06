import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';       // Main screen
import ProfileScreen from './screens/ProfileScreen'; // User details
import HabitScreen from './screens/HabitScreen';     // Habit tracker

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Habit" component={HabitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
