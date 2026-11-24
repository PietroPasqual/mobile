import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SugestoesProvider } from './src/context/SugestoesContext';
import AppNavigator from './src/navigation/AppNavigator';

// Ponto de entrada do app: providers + navegação
export default function App() {
  return (
    <SafeAreaProvider>
      <SugestoesProvider>
        <AppNavigator />
        <StatusBar style="dark" />
      </SugestoesProvider>
    </SafeAreaProvider>
  );
}
