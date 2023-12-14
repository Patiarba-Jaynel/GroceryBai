import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';

import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';

import global from './theme/global';
import { light } from './theme/colors';

import AppNavigation from './Components/Navigations/AppNavigation';

export default function App() {
  return (
  <PaperProvider>
    <SafeAreaProvider>
        <StatusBar style="auto" />
        <AppNavigation/>
    </SafeAreaProvider>
  </PaperProvider>
  );
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
