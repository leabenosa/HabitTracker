import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import {
  Provider as PaperProvider,
  Text,
  TextInput,
  Button,
  Divider,
  Checkbox,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type Habit = {
  id: string;
  name: string;
  doneToday: boolean;
};

function AppContent() {
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
        <Checkbox
          status={item.doneToday ? 'checked' : 'unchecked'}
          onPress={() => toggleHabit(item.id)}
        />
        <Text style={styles.habitText}>{item.name}</Text>
      </View>
    ),
    [toggleHabit]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌱 Habit Tracker</Text>
      <TextInput
        label="New Habit"
        value={newHabit}
        onChangeText={setNewHabit}
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={addHabit} style={styles.button}>
        Add Habit
      </Button>

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

// ✅ Final export with both SafeAreaProvider and PaperProvider
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AppContent />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  habitText: {
    fontSize: 18,
  },
  emptyText: {
    fontStyle: 'italic',
    alignSelf: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
