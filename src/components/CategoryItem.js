import { Pressable, StyleSheet, Text } from 'react-native';
import { cores } from '../theme/colors';

// "Chip" de categoria, usado na Home (macro e micro) e no Cadastro.
// Props:
//  - nome: texto da categoria
//  - emoji: ícone opcional antes do nome
//  - selecionado: true quando é a categoria ativa (muda a cor)
//  - onPress: função chamada ao tocar
export default function CategoryItem({ nome, emoji, selecionado = false, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selecionado && styles.chipSelecionado,
        pressed && styles.pressionado,
      ]}
    >
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text style={[styles.texto, selecionado && styles.textoSelecionado]}>{nome}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    // Emoji e texto lado a lado: layout em LINHA
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 22,
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  chipSelecionado: {
    backgroundColor: cores.primaria,
    borderColor: cores.primaria,
  },
  pressionado: {
    opacity: 0.7,
  },
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  texto: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.texto,
  },
  textoSelecionado: {
    color: cores.branco,
  },
});
