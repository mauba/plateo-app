import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation';
import { LocaleProvider } from './src/i18n';

export default function App() {
  return (
    <SafeAreaProvider>
      <LocaleProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </LocaleProvider>
    </SafeAreaProvider>
  );
}
