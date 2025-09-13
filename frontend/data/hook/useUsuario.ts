import { useContext } from "react";
import { UsuarioContexto } from "../context/UsuarioContexto";

// Hook customizado para acessar o contexto do usuário
export default function useUsuario() {
  const contexto = useContext(UsuarioContexto);

  if (!contexto) {
    throw new Error("useUsuario deve ser usado dentro de um UsuarioContextoProvider");
  }

  return contexto;
}
