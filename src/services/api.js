import axios from 'axios';

// Instância do axios com a URL base da API pública JSONPlaceholder.
// Assim, nas telas basta chamar api.get('/posts'), api.post('/posts', dados) etc.
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10 segundos: se passar disso, consideramos erro
});

// Transforma o erro do axios em uma mensagem amigável para o usuário.
export function mensagemDeErro(erro) {
  if (erro.response) {
    // O servidor respondeu, mas com status de erro
    const status = erro.response.status;
    if (status === 404) return 'Não encontramos o que você procurou (erro 404).';
    if (status >= 500) return 'O servidor está com problemas. Tente novamente mais tarde.';
    return `Ocorreu um erro inesperado (status ${status}).`;
  }
  // Sem resposta: normalmente é falta de internet ou tempo esgotado
  return 'Sem conexão com a internet. Verifique sua rede e tente novamente.';
}

export default api;
