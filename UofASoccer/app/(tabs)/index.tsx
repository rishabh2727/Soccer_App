// app/(tabs)/index.tsx
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../services/firebase';


export default function HomeScreen() {
  // just check if the auth and db objects have loaded properly uisng a ternanry operator
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UofA Soccer App</Text>
      <Text style={styles.status}>Firebase Connected! </Text>
      <Text style={styles.status}>Auth ready: {auth ? 'Connected😍' : 'Not Connected'}</Text>
      <Text style={styles.status}>Database ready: {db ? 'Connected😍' : 'Not Connected'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
  },
});