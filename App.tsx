import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import {
  Provider as PaperProvider,
  Text,
  TextInput,
  Button,
  Divider,
  DefaultTheme,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type Habit = {
  id: string;
  name: string;
  doneToday: boolean;
};

// 💜 Custom violet theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7C4DFF',       // Deep violet
    accent: '#B388FF',        // Light violet
    background: '#F3E5F5',    // Very light violet
    surface: '#EDE7F6',       // Paper surface
    text: '#4A148C',          // Dark violet
    placeholder: '#9575CD',
  },
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
      <Text style={styles.habitText}>{item.name}</Text>
      
   <Button
  mode="contained"
  onPress={() => toggleHabit(item.id)}
  style={[styles.doneButton, item.doneToday && styles.doneButtonDone]}
  labelStyle={[
    styles.doneButtonLabel,
    item.doneToday && styles.doneButtonLabelDone
  ]}
  icon={item.doneToday ? 'check' : undefined}
>
  {item.doneToday ? 'Done' : 'Done for today'}
</Button>



    </View>
  ),
  [toggleHabit]
);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Tracker</Text>

      <View style={styles.inputRow}>
        <TextInput
          label="New Habit"
          value={newHabit}
          onChangeText={setNewHabit}
          mode="outlined"
          style={styles.input}
        />
        <Button
  mode="contained"
  onPress={addHabit}
  style={styles.button}
>
  Add Habit
</Button>

      </View>

      {habits.length > 0 && (
        <Text style={styles.instruction}>Tap checkbox to mark "Done for today"</Text>
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

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
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
    backgroundColor: '#F3E5F5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#4A148C',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    alignSelf: 'stretch',
     marginBottom: 20,
    height: 56,
    justifyContent: 'center',
  },
  instruction: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7E57C2',
    alignSelf: 'center',
    marginBottom: 10,
  },
  habitItem: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between', 
  paddingVertical: 8,
  },
  habitText: {
  fontSize: 18,
  color: '#4A148C',
  flex: 1, 
},

  emptyText: {
    fontStyle: 'italic',
    alignSelf: 'center',
    marginTop: 20,
    color: '#9575CD',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
 doneButton: {
    marginTop: 8,
    backgroundColor: '#D1C4E9', 
  },
  doneButtonDone: {
    backgroundColor: '#4A148C', 
  },
  doneButtonLabel: {
    color: '#4A148C', 
  },
  doneButtonLabelDone: {
    color: 'white',
  },



});
