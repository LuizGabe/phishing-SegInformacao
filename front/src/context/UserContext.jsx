import React, { createContext, useState } from "react";

// Crie o contexto do usuário
export const UserContext = createContext();

// Crie o provedor do contexto do usuário
export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [admData, setAdmData] = useState([]);
  const [ redirectUrl, setRedirectUrl ] = useState("");

  // Função para atualizar o email
  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };
  const updateAdmData = (newAdmData) => {
    setAdmData(newAdmData);
  }
  const updateRedirectUrl = (newRedirectUrl) => {
    setRedirectUrl(newRedirectUrl);
  }

  // Valor do contexto a ser fornecido aos componentes
  const contextValue = {
    email,
    updateEmail,
    admData,
    updateAdmData,
    redirectUrl,
    updateRedirectUrl
  };


  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
