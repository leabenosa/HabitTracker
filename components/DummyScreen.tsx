// DummyScreen.tsx
import React from 'react';
import { Text as RNText } from 'react-native';
import { styles } from './styles'; // Adjust the path if needed

export function ProfileScreen() {
  return <RNText style={styles.screenText}>👤 Profile Page</RNText>;
}

export function DoneScreen() {
  return <RNText style={styles.screenText}>✅ Done Habits</RNText>;
}

export function UndoneScreen() {
  return <RNText style={styles.screenText}>❌ Undone Habits</RNText>;
}
