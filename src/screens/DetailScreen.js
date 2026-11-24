import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { categoriasMicro } from '../data/cardapio';
import { cores, ESPACO } from '../theme/colors';
import { formatarPreco } from '../utils/formatarPreco';

// Tela 3 — Detalhe do item
export default function DetailScreen({ route, navigation }) {
  // O produto chega pela navegação: navigation.navigate('Detalhe', { produto })
  const { produto } = route.params;
  const [quantidade, setQuantidade] = useState(1);
  const { width } = useWindowDimensions();

  // Coloca o nome do produto no título do cabeçalho
  useEffect(() => {
    navigation.setOptions({ title: produto.nome });
  }, [navigation, produto.nome]);

  const emPromocao = produto.precoPromocional != null;
  const precoUnitario = emPromocao ? produto.precoPromocional : produto.preco;
  const total = precoUnitario * quantidade;
  const categoria = categoriasMicro.find((micro) => micro.id === produto.microId);

  function diminuir() {
    // Não deixa a quantidade ficar menor que 1
    setQuantidade((atual) => Math.max(1, atual - 1));
  }

  function aumentar() {
    setQuantidade((atual) => atual + 1);
  }

  function comprar() {
    Alert.alert(
      'Item comprado! ☕',
      `${quantidade}x ${produto.nome} adicionado ao seu pedido.\nTotal: ${formatarPreco(total)}`,
      [
        { text: 'Continuar comprando', onPress: () => navigation.goBack() },
        { text: 'OK' },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.tela} edges={['bottom']}>
      <ScrollView>
        <Image
          source={{ uri: produto.imagem }}
          style={[styles.imagem, { height: Math.min(width * 0.8, 420) }]}
        />

        <View style={styles.conteudo}>
          {categoria && <Text style={styles.categoria}>{categoria.nome}</Text>}
          <Text style={styles.nome}>{produto.nome}</Text>

          <View style={styles.linhaPreco}>
            <Text style={[styles.preco, emPromocao && styles.precoPromo]}>
              {formatarPreco(precoUnitario)}
            </Text>
            {emPromocao && <Text style={styles.precoAntigo}>{formatarPreco(produto.preco)}</Text>}
            {emPromocao && (
              <View style={styles.badge}>
                <Text style={styles.badgeTexto}>Promoção</Text>
              </View>
            )}
          </View>

          <Text style={styles.tituloSecao}>Descrição</Text>
          <Text style={styles.descricao}>{produto.descricao}</Text>

          <Text style={styles.tituloSecao}>Quantidade</Text>
          <View style={styles.quantidade}>
            <Pressable style={styles.botaoQtd} onPress={diminuir}>
              <Text style={styles.botaoQtdTexto}>−</Text>
            </Pressable>
            <Text style={styles.qtdTexto}>{quantidade}</Text>
            <Pressable style={styles.botaoQtd} onPress={aumentar}>
              <Text style={styles.botaoQtdTexto}>+</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Rodapé fixo: fica fora do ScrollView, então o botão está sempre visível */}
      <View style={styles.rodape}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValor}>{formatarPreco(total)}</Text>
        </View>
        <CustomButton titulo="Comprar" onPress={comprar} style={styles.botaoComprar} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  imagem: {
    width: '100%',
    backgroundColor: cores.borda,
  },
  conteudo: {
    padding: ESPACO,
  },
  categoria: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.destaque,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  nome: {
    marginTop: 4,
    fontSize: 26,
    fontWeight: '800',
    color: cores.texto,
  },
  linhaPreco: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  preco: {
    fontSize: 22,
    fontWeight: '800',
    color: cores.primaria,
    marginRight: 10,
  },
  precoPromo: {
    color: cores.promocao,
  },
  precoAntigo: {
    fontSize: 15,
    color: cores.textoSuave,
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  badge: {
    backgroundColor: cores.promocao,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeTexto: {
    color: cores.branco,
    fontSize: 12,
    fontWeight: '700',
  },
  tituloSecao: {
    marginTop: 22,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '700',
    color: cores.texto,
  },
  descricao: {
    fontSize: 15,
    lineHeight: 22,
    color: cores.textoSuave,
  },
  quantidade: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoQtd: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: cores.primaria,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoQtdTexto: {
    fontSize: 22,
    fontWeight: '700',
    color: cores.primaria,
  },
  qtdTexto: {
    minWidth: 48,
    fontSize: 20,
    fontWeight: '700',
    color: cores.texto,
    textAlign: 'center',
  },
  rodape: {
    // LINHA: total à esquerda e botão à direita
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ESPACO,
    paddingVertical: 12,
    backgroundColor: cores.card,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
  },
  totalLabel: {
    fontSize: 13,
    color: cores.textoSuave,
  },
  totalValor: {
    fontSize: 20,
    fontWeight: '800',
    color: cores.texto,
  },
  botaoComprar: {
    flex: 1,
    marginLeft: ESPACO,
  },
});
