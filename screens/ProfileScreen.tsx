import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Avatar, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const user = {
    name: 'Dilan Bryze',
    age: 21,
    bio: 'A passionate mobile developer and content creator.',
    image: 'https://i.pravatar.cc/300',
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Image size={100} source={{ uri: user.image }} />
          <Text variant="titleLarge" style={styles.title}>{user.name}</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>Age: {user.age}</Text>
          <Text variant="bodyMedium">{user.bio}</Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button onPress={() => console.log('Edit Profile')}>Edit</Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  card: {
    padding: 20,
    borderRadius: 10,
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#888',
  },
  actions: {
    justifyContent: 'center',
    marginTop: 10,
  },
});
