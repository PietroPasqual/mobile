import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme/colors';

// Card de um item da lista da API (tela Sugestões).
// Props:
//  - titulo, descricao: textos principais
//  - etiqueta: texto pequeno em cima (ex.: "Cliente #3" ou "Doces · R$ 9,90")
//  - novo: true para itens cadastrados pelo usuário (mostra um selo "Novo")
//  - onEditar, onExcluir: funções dos botões de ação
export default function SuggestionCard({ titulo, descricao, etiqueta, novo, onEditar, onExcluir }) {
  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <Text style={styles.etiqueta}>{etiqueta}</Text>
        {novo && <Text style={styles.selo}>Novo</Text>}
      </View>

      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descricao} numberOfLines={3}>
        {descricao}
      </Text>

      <View style={styles.acoes}>
        <Pressable onPress={onEditar} style={styles.acao} hitSlop={8}>
          <Text style={styles.acaoTexto}>✏️ Editar</Text>
        </Pressable>
        <Pressable onPress={onExcluir} style={styles.acao} hitSlop={8}>
          <Text style={[styles.acaoTexto, styles.acaoPerigo]}>🗑️ Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between', // etiqueta à esquerda, selo à direita
    alignItems: 'center',
    marginBottom: 6,
  },
  etiqueta: {
    fontSize: 12,
    fontWeight: '600',
    color: cores.textoSuave,
    textTransform: 'uppercase',
  },
  selo: {
    fontSize: 11,
    fontWeight: '700',
    color: cores.branco,
    backgroundColor: cores.sucesso,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.texto,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  descricao: {
    fontSize: 14,
    lineHeight: 20,
    color: cores.textoSuave,
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // botões encostados à direita
    marginTop: 10,
  },
  acao: {
    marginLeft: 18,
  },
  acaoTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.primaria,
  },
  acaoPerigo: {
    color: cores.perigo,
  },
});
