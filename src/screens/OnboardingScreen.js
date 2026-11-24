import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { cores } from '../theme/colors';

// Destaques mostrados em linha embaixo do subtítulo
const destaques = [
  { id: '1', emoji: '🛵', texto: 'Entrega rápida' },
  { id: '2', emoji: '🌱', texto: 'Grãos especiais' },
  { id: '3', emoji: '🥐', texto: 'Feito na hora' },
];

// Tela 1 — Boas-vindas / Onboarding
export default function OnboardingScreen({ navigation }) {
  function comecar() {
    // replace: troca a tela atual pela Principal, assim o botão "voltar"
    // do Android não retorna para o onboarding
    navigation.replace('Principal');
  }

  return (
    <SafeAreaView style={styles.tela}>
      {/* ScrollView com flexGrow: 1 deixa o conteúdo centralizado em telas grandes
          e permite rolar em telas pequenas, sem cortar nada */}
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.logo}>
          <Text style={styles.logoEmoji}>☕</Text>
        </View>

        <Text style={styles.titulo}>Bem-vindo!</Text>
        <Text style={styles.nomeApp}>Grão Café</Text>
        <Text style={styles.subtitulo}>
          Peça cafés, lanches e doces da nossa cafeteria e receba quentinho na sua casa.
        </Text>

        <View style={styles.destaques}>
          {destaques.map((item) => (
            <View key={item.id} style={styles.destaque}>
              <Text style={styles.destaqueEmoji}>{item.emoji}</Text>
              <Text style={styles.destaqueTexto}>{item.texto}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Rodapé fixo com o botão principal */}
      <View style={styles.rodape}>
        <CustomButton titulo="Começar" onPress={comecar} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    flexGrow: 1,
    // COLUNA (padrão): itens empilhados, centralizados na vertical e na horizontal
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 32,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: cores.primaria,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 6,
    borderColor: cores.destaque,
  },
  logoEmoji: {
    fontSize: 64,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '800',
    color: cores.texto,
  },
  nomeApp: {
    fontSize: 18,
    fontWeight: '700',
    color: cores.primaria,
    marginTop: 4,
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 16,
    lineHeight: 23,
    color: cores.textoSuave,
    textAlign: 'center',
    marginTop: 14,
    maxWidth: 340,
  },
  destaques: {
    // LINHA: os três destaques lado a lado, com espaço igual entre eles
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    maxWidth: 360,
    marginTop: 32,
  },
  destaque: {
    flex: 1,
    alignItems: 'center',
  },
  destaqueEmoji: {
    fontSize: 26,
  },
  destaqueTexto: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    color: cores.texto,
    textAlign: 'center',
  },
  rodape: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
});
