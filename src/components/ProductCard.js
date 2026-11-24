import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme/colors';
import { formatarPreco } from '../utils/formatarPreco';

// Card de produto usado no grid de 2 colunas da Home.
// Props:
//  - nome, preco, imagem: dados do produto
//  - precoPromocional: se existir, mostra o badge "Promoção" e o preço riscado
//  - largura: largura do card, calculada na Home a partir do tamanho da tela
//  - onPress: função chamada ao tocar no card
export default function ProductCard({ nome, preco, precoPromocional, imagem, largura, onPress }) {
  const emPromocao = precoPromocional != null;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, { width: largura }, pressed && styles.pressionado]}
    >
      <Image source={{ uri: imagem }} style={[styles.imagem, { height: largura * 0.85 }]} />

      {emPromocao && (
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>Promoção</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={2}>
          {nome}
        </Text>

        {emPromocao ? (
          <View style={styles.linhaPreco}>
            <Text style={styles.precoPromocional}>{formatarPreco(precoPromocional)}</Text>
            <Text style={styles.precoAntigo}>{formatarPreco(preco)}</Text>
          </View>
        ) : (
          <Text style={styles.preco}>{formatarPreco(preco)}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  pressionado: {
    opacity: 0.85,
  },
  imagem: {
    width: '100%',
    backgroundColor: cores.borda, // cor de fundo enquanto a foto carrega
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: cores.promocao,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeTexto: {
    color: cores.branco,
    fontSize: 12,
    fontWeight: '700',
  },
  info: {
    padding: 12,
  },
  nome: {
    fontSize: 15,
    fontWeight: '700',
    color: cores.texto,
    minHeight: 40, // reserva 2 linhas para os cards ficarem alinhados
  },
  linhaPreco: {
    // Preço promocional e preço antigo lado a lado
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  preco: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '700',
    color: cores.primaria,
  },
  precoPromocional: {
    fontSize: 17,
    fontWeight: '800',
    color: cores.promocao,
    marginRight: 6,
  },
  precoAntigo: {
    fontSize: 13,
    color: cores.textoSuave,
    textDecorationLine: 'line-through',
  },
});
