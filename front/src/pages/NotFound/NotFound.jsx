import React from "react";
import styles from "./style.module.css"; // Importa o arquivo CSS com CSS Modules

export const NotFound = () => {
  return (
    <section className={styles.section}>
      <main id={styles.container} role="main">
      <a href="./">
        <span className={styles.logo} aria-label="Google" role="img"></span>
      </a>
      <p>
        <b>404. </b>
        <ins>Isso é um erro</ins>
      </p>      
      <p>
        O servidor não pode processar a solicitação porque ela está malformada.
        Não deve ser repetido. <ins>Isso é tudo que sabemos.</ins>
      </p>
    </main>
    </section >
    
  );
};
