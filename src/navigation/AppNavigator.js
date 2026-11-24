import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SuggestionsScreen from '../screens/SuggestionsScreen';
import { cores } from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Ícone das abas feito com emoji (fica mais apagado quando a aba não está ativa)
function IconeAba({ emoji, focado }) {
  return <Text style={[styles.icone, !focado && styles.iconeInativo]}>{emoji}</Text>;
}

const cabecalho = {
  headerStyle: { backgroundColor: cores.fundo },
  headerTintColor: cores.primariaEscura,
  headerTitleStyle: { fontWeight: '800' },
  headerShadowVisible: false,
};

// Abas de baixo: Cardápio (Home), Sugestões (API) e Cadastrar
function AbasPrincipais() {
  return (
    <Tab.Navigator
      screenOptions={{
        ...cabecalho,
        tabBarActiveTintColor: cores.primaria,
        tabBarInactiveTintColor: cores.textoSuave,
        tabBarStyle: styles.barraAbas,
        tabBarLabelStyle: styles.textoAba,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Cardápio',
          tabBarIcon: ({ focused }) => <IconeAba emoji="☕" focado={focused} />,
        }}
      />
      <Tab.Screen
        name="Sugestoes"
        component={SuggestionsScreen}
        options={{
          title: 'Sugestões',
          tabBarIcon: ({ focused }) => <IconeAba emoji="💬" focado={focused} />,
        }}
      />
      <Tab.Screen
        name="Cadastro"
        component={RegisterScreen}
        options={{
          title: 'Cadastrar',
          tabBarIcon: ({ focused }) => <IconeAba emoji="➕" focado={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Pilha de telas: Onboarding -> Principal (abas) -> Detalhe
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={cabecalho}>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Principal"
          component={AbasPrincipais}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detalhe"
          component={DetailScreen}
          options={{ title: 'Detalhe', headerBackTitle: 'Voltar' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icone: {
    fontSize: 20,
    lineHeight: 24, // mesma altura do espaço do ícone, para não cortar o texto da aba
  },
  iconeInativo: {
    opacity: 0.45,
  },
  barraAbas: {
    backgroundColor: cores.card,
    borderTopColor: cores.borda,
  },
  textoAba: {
    fontWeight: '600',
  },
});
