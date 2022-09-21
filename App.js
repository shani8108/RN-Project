import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Person from './Person';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Project app!</Text>
      <StatusBar style="auto" />
      <Person></Person>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
