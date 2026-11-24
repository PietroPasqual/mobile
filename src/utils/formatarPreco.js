// Recebe um número (ex.: 12.5) e devolve no formato brasileiro (ex.: "R$ 12,50").
export function formatarPreco(valor) {
  const numero = Number(valor) || 0;
  return `R$ ${numero.toFixed(2).replace('.', ',')}`;
}
