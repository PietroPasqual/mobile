import { createContext, useContext, useState } from 'react';

// Contexto que guarda a lista de sugestões vinda da API.
// Ele existe para que a tela de Cadastro consiga adicionar um item novo
// e a tela de Sugestões (lista da API) mostre esse item logo em seguida.
const SugestoesContext = createContext(null);

export function SugestoesProvider({ children }) {
  const [sugestoes, setSugestoes] = useState([]);

  return (
    <SugestoesContext.Provider value={{ sugestoes, setSugestoes }}>
      {children}
    </SugestoesContext.Provider>
  );
}

// Hook para usar o contexto nas telas: const { sugestoes, setSugestoes } = useSugestoes();
export function useSugestoes() {
  return useContext(SugestoesContext);
}
