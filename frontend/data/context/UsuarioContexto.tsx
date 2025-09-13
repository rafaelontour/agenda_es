import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from "react";

// Tipagem do contexto
export interface UsuarioContextoProps {
  nome: string;
  setNome: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  telefone: string;
  setTelefone: Dispatch<SetStateAction<string>>;
  tipoAgenda: string;
  setTipoAgenda: Dispatch<SetStateAction<string>>;
}

// Criando o contexto com valor inicial `undefined`
export const UsuarioContexto = createContext<UsuarioContextoProps | undefined>(undefined);

// Provider para envolver a aplicação
export const UsuarioContextoProvider = ({ children }: { children: React.ReactNode }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoAgenda, setTipoAgenda] = useState('');

  return (
    <UsuarioContexto.Provider
      value={{
        nome,
        setNome,
        email,
        setEmail,
        telefone,
        setTelefone,
        tipoAgenda,
        setTipoAgenda
      }}
    >
      {children}
    </UsuarioContexto.Provider>
  );
};

// Hook customizado para consumir o contexto
export function useUsuario() {
  const context = useContext(UsuarioContexto);

  if (!context) {
    throw new Error("useUsuario deve ser usado dentro de um UsuarioContextoProvider");
  }

  return context;
}
