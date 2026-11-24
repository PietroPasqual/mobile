import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { cores } from '../theme/colors';

// Botão reutilizável do app.
// Props:
//  - titulo: texto do botão
//  - onPress: função chamada ao tocar
//  - variante: 'primario' (padrão), 'secundario' ou 'perigo'
//  - carregando: mostra um ActivityIndicator no lugar do texto
//  - desabilitado: impede o toque
//  - style: estilo extra vindo de quem usa o botão
export default function CustomButton({
  titulo,
  onPress,
  variante = 'primario',
  carregando = false,
  desabilitado = false,
  style,
}) {
  const bloqueado = desabilitado || carregando;
  const ehSecundario = variante === 'secundario';

  return (
    <Pressable
      onPress={onPress}
      disabled={bloqueado}
      style={({ pressed }) => [
        styles.botao,
        styles[variante],
        pressed && styles.pressionado,
        bloqueado && styles.bloqueado,
        style,
      ]}
    >
      {carregando ? (
        <ActivityIndicator color={ehSecundario ? cores.primaria : cores.branco} />
      ) : (
        <Text style={[styles.texto, ehSecundario && styles.textoSecundario]}>{titulo}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    minHeight: 50,
    paddingHorizontal: 20,
    borderRadius: 14,
    // Centraliza o texto vertical (justifyContent) e horizontalmente (alignItems)
    justifyContent: 'center',
    alignItems: 'center',
  },
  primario: {
    backgroundColor: cores.primaria,
  },
  secundario: {
    backgroundColor: cores.branco,
    borderWidth: 1.5,
    borderColor: cores.primaria,
  },
  perigo: {
    backgroundColor: cores.perigo,
  },
  pressionado: {
    opacity: 0.8,
  },
  bloqueado: {
    opacity: 0.5,
  },
  texto: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.branco,
  },
  textoSecundario: {
    color: cores.primaria,
  },
});
