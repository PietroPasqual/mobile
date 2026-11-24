import { useState } from 'react';
import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import CategoryItem from '../components/CategoryItem';
import ProductCard from '../components/ProductCard';
import StatusMessage from '../components/StatusMessage';
import { categoriasMacro, categoriasMicro, produtos } from '../data/cardapio';
import { cores, ESPACO } from '../theme/colors';

// Tela 2 — Home (cardápio)
export default function HomeScreen({ navigation }) {
  // Categoria macro selecionada (começa em "Quentes")
  const [macroSelecionada, setMacroSelecionada] = useState(categoriasMacro[0].id);
  // Categoria micro selecionada (null = "Todos" da macro atual)
  const [microSelecionada, setMicroSelecionada] = useState(null);

  // Largura da tela: usada para calcular o tamanho de cada card do grid
  const { width } = useWindowDimensions();
  // 2 colunas: tira o espaço das laterais e o espaço do meio, divide por 2
  const larguraCard = (width - ESPACO * 3) / 2;

  // ---------- FILTROS ----------
  // 1) Micros que pertencem à macro escolhida
  const microsDaMacro = categoriasMicro.filter((micro) => micro.macroId === macroSelecionada);

  // 2) Produtos exibidos no grid
  const produtosFiltrados = produtos.filter((produto) => {
    if (microSelecionada) {
      // Uma micro específica foi escolhida: mostra só os produtos dela
      return produto.microId === microSelecionada;
    }
    // "Todos": mostra os produtos de qualquer micro da macro escolhida
    return microsDaMacro.some((micro) => micro.id === produto.microId);
  });

  function selecionarMacro(id) {
    setMacroSelecionada(id);
    setMicroSelecionada(null); // ao trocar a macro, volta para "Todos"
  }

  function abrirDetalhe(produto) {
    navigation.navigate('Detalhe', { produto });
  }

  // Cabeçalho da lista: saudação + categorias macro + categorias micro
  const cabecalho = (
    <View>
      <Text style={styles.saudacao}>Olá! 👋</Text>
      <Text style={styles.pergunta}>O que vai pedir hoje?</Text>

      <Text style={styles.secao}>Categorias</Text>
      <FlatList
        data={categoriasMacro}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listaHorizontal}
        renderItem={({ item }) => (
          <CategoryItem
            nome={item.nome}
            emoji={item.emoji}
            selecionado={item.id === macroSelecionada}
            onPress={() => selecionarMacro(item.id)}
          />
        )}
      />

      <FlatList
        data={[{ id: 'todos', nome: 'Todos' }, ...microsDaMacro]}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.listaHorizontal, styles.listaMicro]}
        renderItem={({ item }) => {
          const ehTodos = item.id === 'todos';
          return (
            <CategoryItem
              nome={item.nome}
              selecionado={ehTodos ? microSelecionada === null : item.id === microSelecionada}
              onPress={() => setMicroSelecionada(ehTodos ? null : item.id)}
            />
          );
        }}
      />

      <Text style={styles.contador}>
        {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'item' : 'itens'}
      </Text>
    </View>
  );

  return (
    <View style={styles.tela}>
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={cabecalho}
        columnWrapperStyle={styles.linhaGrid}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <StatusMessage emoji="🤷" titulo="Nenhum item nesta categoria" />
        }
        renderItem={({ item }) => (
          <ProductCard
            nome={item.nome}
            preco={item.preco}
            precoPromocional={item.precoPromocional}
            imagem={item.imagem}
            largura={larguraCard}
            onPress={() => abrirDetalhe(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    paddingHorizontal: ESPACO,
    paddingBottom: ESPACO,
  },
  linhaGrid: {
    // Cada linha do grid tem 2 cards: um encostado em cada lado,
    // e o espaço que sobra fica no meio
    justifyContent: 'space-between',
  },
  saudacao: {
    marginTop: ESPACO,
    fontSize: 15,
    color: cores.textoSuave,
  },
  pergunta: {
    fontSize: 24,
    fontWeight: '800',
    color: cores.texto,
  },
  secao: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700',
    color: cores.texto,
  },
  listaHorizontal: {
    paddingRight: ESPACO,
  },
  listaMicro: {
    marginTop: 12,
  },
  contador: {
    marginTop: 16,
    marginBottom: 12,
    fontSize: 13,
    color: cores.textoSuave,
  },
});
