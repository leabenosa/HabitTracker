import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Divider,
  DefaultTheme,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../components/styles'; // ✅ FIXED IMPORT
import LinearGradient from 'react-native-linear-gradient';
import { Provider as PaperProvider } from 'react-native-paper';


type Habit = {
  id: string;
  name: string;
  doneToday: boolean;
};

// 💜 Optional custom theme (not used in this screen directly)
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7C4DFF',
    accent: '#B388FF',
    background: '#F3E5F5',
    surface: '#EDE7F6',
    text: '#4A148C',
    placeholder: '#9575CD',
  },
};

export default function HabitScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const saved = await AsyncStorage.getItem('habits');
        if (saved) {
          setHabits(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading habits:', error);
      }
    };
    loadHabits();
  }, []);

  const saveHabits = useCallback(async () => {
    try {
      await AsyncStorage.setItem('habits', JSON.stringify(habits));
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  }, [habits]);

  useEffect(() => {
    saveHabits();
  }, [saveHabits]);

  const addHabit = useCallback(() => {
    if (newHabit.trim().length === 0) return;
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.trim(),
      doneToday: false,
    };
    setHabits((prev) => [habit, ...prev]);
    setNewHabit('');
  }, [newHabit]);

  const toggleHabit = useCallback((id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, doneToday: !h.doneToday } : h))
    );
  }, []);

  const renderSeparator = useCallback(() => <Divider />, []);

  const renderHabitItem = useCallback(
    ({ item }: { item: Habit }) => (
      <View style={styles.habitItem}>
        <Text style={styles.habitText}>{item.name}</Text>

        <TouchableOpacity onPress={() => toggleHabit(item.id)}>
          <LinearGradient
            colors={
              item.doneToday
                ? ['rgba(97, 22, 167, 0.57)', 'rgba(33, 30, 170, 0.16)']
                : ['rgba(37, 58, 175, 0.68)', 'rgba(88, 11, 139, 0.89)']
            }
            style={[
              styles.glassButton,
              item.doneToday ? styles.glassButtonDone : styles.glassButtonDefault,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.buttonText}>
              {item.doneToday ? '✔ Done' : '✓ Mark as Done'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    ),
    [toggleHabit]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Tracker</Text>
 
 
      <PaperProvider theme={theme}>
         <View style={styles.container}>
      ...
        </View>
      </PaperProvider>

      <View style={styles.inputRow}>
        <TextInput
          label="New Habit"
          value={newHabit}
          onChangeText={setNewHabit}
          mode="outlined"
          dense
          style={styles.input}
          contentStyle={styles.inputContent}
        />

        <Button mode="contained" onPress={addHabit} style={styles.button}>
          Add Habit
        </Button>
      </View>

      {habits.length > 0 && (
        <Text style={styles.instruction}>Tap 'Done' to mark as complete</Text>
      )}

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabitItem}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No habits yet. Add one!</Text>
        }
        contentContainerStyle={
          habits.length === 0 ? styles.emptyContainer : undefined
        }
      />
    </View>
  );
}
