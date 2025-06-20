import React from 'react';

const Listagem = ({
  entradaSaida,
  entradaSaidaOriginal,
  filtroPesquisa,
  setEditando,
  setIndexEditando,
  setNovaEntradaSaida,
  setEntradaSaida,
}) => {
  const excluirEntradaSaida = (index) => {
    const novaLista = [...entradaSaidaOriginal];
    novaLista.splice(index, 1);
    setEntradaSaida(novaLista);
  };

  const editarEntradaSaida = (index, entrada) => {
    setEditando(true);
    setIndexEditando(index);
    setNovaEntradaSaida(entrada);
  };

  return (
    <ul>
      {entradaSaida.map((entrada, index) => (
        <li key={index}>
          <p>Nome: {entrada.nome}</p>
          <p>Observações: {entrada.obs}</p>
          <p>Entrada: {entrada.entrada}</p>
          <p>Saída: {entrada.saida}</p>
          <button type="button" onClick={() => editarEntradaSaida(index, entrada)}>
            Editar
          </button>
          <button type="button" onClick={() => excluirEntradaSaida(index)}>
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Listagem;
          
