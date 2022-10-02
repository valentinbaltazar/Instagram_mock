import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigation from './AuthNavigation';

import SignedInStack from './screens/Navigation';


export default function App() {
  return (
    <AuthNavigation />
  )
}
