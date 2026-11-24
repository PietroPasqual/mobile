import { StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme/colors';
import CustomButton from './CustomButton';

// Mensagem centralizada para estados especiais da lista:
// erro de conexão, lista vazia, "nenhum item encontrado" etc.
// Props:
//  - emoji, titulo, mensagem: conteúdo exibido
//  - textoBotao + onPressBotao: botão opcional (ex.: "Tentar novamente")
export default function StatusMessage({ emoji, titulo, mensagem, textoBotao, onPressBotao }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.titulo}>{titulo}</Text>
      {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
      {textoBotao ? (
        <CustomButton titulo={textoBotao} onPress={onPressBotao} style={styles.botao} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Tudo empilhado em COLUNA e centralizado
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: cores.texto,
    textAlign: 'center',
  },
  mensagem: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: cores.textoSuave,
    textAlign: 'center',
  },
  botao: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
});
