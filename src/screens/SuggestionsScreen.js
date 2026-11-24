import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import StatusMessage from '../components/StatusMessage';
import SuggestionCard from '../components/SuggestionCard';
import { useSugestoes } from '../context/SugestoesContext';
import api, { mensagemDeErro } from '../services/api';
import { cores, ESPACO } from '../theme/colors';
import { formatarPreco } from '../utils/formatarPreco';

// Tela 4 — Lista da API
// Mostra as "sugestões dos clientes" vindas de https://jsonplaceholder.typicode.com/posts
export default function SuggestionsScreen({ navigation }) {
  // A lista fica no contexto para a tela de Cadastro poder adicionar itens nela
  const { sugestoes, setSugestoes } = useSugestoes();
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [textoBusca, setTextoBusca] = useState(''); // o que está digitado no campo
  const [termoBuscado, setTermoBuscado] = useState(''); // o que foi buscado ao tocar em "Buscar"

  // Busca os dados na API
  async function carregarSugestoes() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get('/posts');
      // Mantém no topo os itens cadastrados pelo usuário (local) e depois os da API
      setSugestoes((atual) => [...atual.filter((item) => item.local), ...resposta.data]);
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  }

  // useEffect com [] roda UMA vez, quando a tela abre: é aqui que a API é chamada
  useEffect(() => {
    carregarSugestoes();
  }, []);

  // ---------- BUSCA ----------
  function buscar() {
    if (textoBusca.trim() === '') {
      Alert.alert('Campo vazio', 'Digite algo para buscar.');
      return; // não busca se o campo estiver vazio
    }
    setTermoBuscado(textoBusca.trim().toLowerCase());
  }

  function limparBusca() {
    setTextoBusca('');
    setTermoBuscado('');
  }

  // Se tem termo buscado, filtra pelo título ou pela descrição
  const listaExibida = termoBuscado
    ? sugestoes.filter(
        (item) =>
          item.title.toLowerCase().includes(termoBuscado) ||
          item.body.toLowerCase().includes(termoBuscado)
      )
    : sugestoes;

  // ---------- EDITAR / EXCLUIR (diferencial: PUT e DELETE) ----------
  function editar(item) {
    // Abre a aba de Cadastro já preenchida com o item
    navigation.navigate('Cadastro', { item });
  }

  function confirmarExclusao(item) {
    Alert.alert('Excluir sugestão', `Deseja mesmo excluir "${item.title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => excluir(item) },
    ]);
  }

  async function excluir(item) {
    try {
      // Itens criados no app não existem de verdade na API (ela é falsa),
      // então só chamamos o DELETE para os itens que vieram dela
      if (!item.local) {
        await api.delete(`/posts/${item.id}`);
      }
      setSugestoes((atual) => atual.filter((s) => s.id !== item.id));
    } catch (e) {
      Alert.alert('Erro ao excluir', mensagemDeErro(e));
    }
  }

  // Texto pequeno em cima de cada card
  function etiquetaDo(item) {
    if (item.categoria) {
      return `${item.categoria} · ${formatarPreco(item.preco)}`;
    }
    return `Cliente #${item.userId}`;
  }

  // ---------- RENDERIZAÇÃO ----------
  function renderConteudo() {
    if (carregando) {
      return (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color={cores.primaria} />
          <Text style={styles.carregandoTexto}>Carregando sugestões...</Text>
        </View>
      );
    }

    if (erro) {
      return (
        <StatusMessage
          emoji="📡"
          titulo="Não foi possível carregar"
          mensagem={erro}
          textoBotao="Tentar novamente"
          onPressBotao={carregarSugestoes}
        />
      );
    }

    return (
      <FlatList
        data={listaExibida}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <Text style={styles.contador}>
            {termoBuscado
              ? `${listaExibida.length} resultado(s) para "${termoBuscado}"`
              : `${listaExibida.length} sugestões`}
          </Text>
        }
        ListEmptyComponent={
          <StatusMessage
            emoji="🔍"
            titulo="Nenhum item encontrado"
            mensagem="Tente buscar por outra palavra."
          />
        }
        renderItem={({ item }) => (
          <SuggestionCard
            titulo={item.title}
            descricao={item.body}
            etiqueta={etiquetaDo(item)}
            novo={item.local}
            onEditar={() => editar(item)}
            onExcluir={() => confirmarExclusao(item)}
          />
        )}
      />
    );
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.intro}>Ideias e receitas enviadas pelos nossos clientes.</Text>

      {/* Linha de busca: campo ocupa o espaço livre (flex: 1) e o botão fica ao lado */}
      <View style={styles.busca}>
        <TextInput
          style={styles.campoBusca}
          placeholder="Buscar sugestão..."
          placeholderTextColor={cores.textoSuave}
          value={textoBusca}
          onChangeText={setTextoBusca}
          onSubmitEditing={buscar}
          returnKeyType="search"
        />
        <CustomButton titulo="Buscar" onPress={buscar} style={styles.botaoBuscar} />
      </View>

      {termoBuscado ? (
        <Text style={styles.limpar} onPress={limparBusca}>
          ✕ Limpar busca
        </Text>
      ) : null}

      {renderConteudo()}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  intro: {
    paddingHorizontal: ESPACO,
    paddingTop: ESPACO,
    fontSize: 14,
    color: cores.textoSuave,
  },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ESPACO,
    paddingTop: 12,
  },
  campoBusca: {
    flex: 1,
    minWidth: 0, // deixa o campo encolher para o botão caber em telas pequenas
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.card,
    fontSize: 15,
    color: cores.texto,
  },
  botaoBuscar: {
    marginLeft: 10,
  },
  limpar: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: ESPACO,
    fontSize: 14,
    fontWeight: '600',
    color: cores.primaria,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carregandoTexto: {
    marginTop: 12,
    fontSize: 14,
    color: cores.textoSuave,
  },
  lista: {
    flexGrow: 1,
    paddingHorizontal: ESPACO,
    paddingBottom: ESPACO,
  },
  contador: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 13,
    color: cores.textoSuave,
  },
});
