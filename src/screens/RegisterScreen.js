import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CategoryItem from '../components/CategoryItem';
import CustomButton from '../components/CustomButton';
import { useSugestoes } from '../context/SugestoesContext';
import { categoriasMacro } from '../data/cardapio';
import api, { mensagemDeErro } from '../services/api';
import { cores, ESPACO } from '../theme/colors';

// Tela 5 — Cadastro de sugestão (POST). Também serve para editar (PUT).
export default function RegisterScreen({ route, navigation }) {
  const { setSugestoes } = useSugestoes();

  // Um useState para cada campo do formulário
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);

  // Quando a tela recebe um item pela navegação (botão "Editar"),
  // preenche o formulário com os dados dele
  const itemRecebido = route.params?.item;
  useEffect(() => {
    if (itemRecebido) {
      setItemEditando(itemRecebido);
      setNome(itemRecebido.title);
      setDescricao(itemRecebido.body);
      setPreco(itemRecebido.preco ? String(itemRecebido.preco).replace('.', ',') : '');
      setCategoria(itemRecebido.categoria ?? null);
    }
  }, [itemRecebido]);

  function limparFormulario() {
    setNome('');
    setPreco('');
    setDescricao('');
    setCategoria(null);
    setItemEditando(null);
    navigation.setParams({ item: undefined });
  }

  // Valida os campos. Retorna o preço convertido em número, ou null se algo estiver errado.
  function validar() {
    if (nome.trim() === '') {
      Alert.alert('Campo obrigatório', 'Preencha o nome do item.');
      return null;
    }
    if (preco.trim() === '') {
      Alert.alert('Campo obrigatório', 'Preencha o preço.');
      return null;
    }
    // Aceita vírgula ou ponto: "12,50" vira 12.5
    const precoNumero = Number(preco.replace(',', '.'));
    if (Number.isNaN(precoNumero) || precoNumero <= 0) {
      Alert.alert('Preço inválido', 'Digite um preço válido. Exemplo: 12,50');
      return null;
    }
    if (descricao.trim() === '') {
      Alert.alert('Campo obrigatório', 'Preencha a descrição.');
      return null;
    }
    if (!categoria) {
      Alert.alert('Campo obrigatório', 'Escolha uma categoria.');
      return null;
    }
    return precoNumero;
  }

  async function salvar() {
    const precoNumero = validar();
    if (precoNumero === null) return; // tem erro: não envia

    // A API JSONPlaceholder usa "title" e "body"; os outros campos vão junto
    const dados = {
      title: nome.trim(),
      body: descricao.trim(),
      preco: precoNumero,
      categoria,
      userId: 1,
    };

    setEnviando(true);
    try {
      if (itemEditando) {
        // ----- EDITAR (PUT) -----
        // Itens criados no app não existem na API falsa, então só enviamos o PUT
        // para os itens que vieram dela
        if (!itemEditando.local) {
          await api.put(`/posts/${itemEditando.id}`, { ...dados, id: itemEditando.id });
        }
        setSugestoes((atual) =>
          atual.map((item) => (item.id === itemEditando.id ? { ...item, ...dados } : item))
        );
        Alert.alert('Sucesso! ✅', 'Sugestão atualizada.');
      } else {
        // ----- CADASTRAR (POST) -----
        const resposta = await api.post('/posts', dados);
        // A API sempre devolve id 101, então criamos um id único para o FlatList
        const novoItem = { ...resposta.data, id: `local-${Date.now()}`, local: true };
        // Adiciona no topo da lista: a tela Sugestões atualiza sozinha
        setSugestoes((atual) => [novoItem, ...atual]);
        Alert.alert('Sucesso! ✅', 'Sugestão cadastrada. Ela já aparece na lista.');
      }
      limparFormulario();
      navigation.navigate('Sugestoes');
    } catch (e) {
      Alert.alert('Erro ao salvar', mensagemDeErro(e));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>
          {itemEditando ? 'Editar sugestão' : 'Sugira um item para o cardápio'}
        </Text>
        <Text style={styles.subtitulo}>
          Todos os campos são obrigatórios. Sua sugestão é enviada para a nossa API.
        </Text>

        <Text style={styles.label}>Nome do item</Text>
        <TextInput
          style={styles.campo}
          placeholder="Ex.: Café com doce de leite"
          placeholderTextColor={cores.textoSuave}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Preço sugerido (R$)</Text>
        <TextInput
          style={styles.campo}
          placeholder="Ex.: 12,50"
          placeholderTextColor={cores.textoSuave}
          value={preco}
          onChangeText={setPreco}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.campo, styles.campoGrande]}
          placeholder="Conte como seria esse item..."
          placeholderTextColor={cores.textoSuave}
          value={descricao}
          onChangeText={setDescricao}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>Categoria</Text>
        {/* Reaproveita o mesmo componente CategoryItem da Home */}
        <View style={styles.categorias}>
          {categoriasMacro.map((item) => (
            <CategoryItem
              key={item.id}
              nome={item.nome}
              emoji={item.emoji}
              selecionado={categoria === item.nome}
              onPress={() => setCategoria(item.nome)}
            />
          ))}
        </View>

        <CustomButton
          titulo={itemEditando ? 'Salvar alterações' : 'Cadastrar sugestão'}
          onPress={salvar}
          carregando={enviando}
          style={styles.botao}
        />
        {itemEditando && (
          <CustomButton
            titulo="Cancelar edição"
            variante="secundario"
            onPress={limparFormulario}
            style={styles.botaoCancelar}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: ESPACO,
    paddingBottom: ESPACO * 2,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: cores.texto,
  },
  subtitulo: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: cores.textoSuave,
  },
  label: {
    marginTop: 18,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '700',
    color: cores.texto,
  },
  campo: {
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.card,
    fontSize: 15,
    color: cores.texto,
  },
  campoGrande: {
    height: 110,
    paddingTop: 12,
  },
  categorias: {
    // LINHA que quebra para a próxima quando não cabe (telas pequenas)
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
  },
  botao: {
    marginTop: 28,
  },
  botaoCancelar: {
    marginTop: 10,
  },
});
