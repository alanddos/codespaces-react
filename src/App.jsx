import React, { useState, useEffect } from 'react';
import './App.css';
import Cadastro from './Cadastro';
import Pesquisa from './Pesquisa';
import Listagem from './Listagem';
import Relatorio from './Relatorio';

const App = () => {
  const [entradaSaida, setEntradaSaida] = useState(() => {
    const dados = localStorage.getItem('entradaSaida');
    return dados ? JSON.parse(dados) : [];
  });
  const [novaEntradaSaida, setNovaEntradaSaida] = useState({
    nome: "",
    obs: "",
    entrada: "",
    saida: "",
  });
  const [filtroPesquisa, setFiltroPesquisa] = useState(new Date().toISOString().slice(0, 10));
  const [editando, setEditando] = useState(false);
  const [indexEditando, setIndexEditando] = useState(null);
  const [isOpenRelatorio, setIsOpenRelatorio] = useState(false);

  useEffect(() => {
    localStorage.setItem('entradaSaida', JSON.stringify(entradaSaida));
  }, [entradaSaida]);

  const entradaSaidaOrdenada = entradaSaida.sort((a, b) => {
    const dataA = a.entrada ? new Date(a.entrada) : a.saida ? new Date(a.saida) : new Date(0);
    const dataB = b.entrada ? new Date(b.entrada) : b.saida ? new Date(b.saida) : new Date(0);
    return dataA - dataB;
  });

  const abrirRelatorio = () => {
    setIsOpenRelatorio(true);
  };

  const fecharRelatorio = () => {
    setIsOpenRelatorio(false);
  };

  return (
    <div>
      <h1 style={{ marginTop: '100px' }}>Gerenciamento de Entradas e Saídas</h1>
      <Cadastro
        entradaSaida={entradaSaida}
        setEntradaSaida={setEntradaSaida}
        novaEntradaSaida={novaEntradaSaida}
        setNovaEntradaSaida={setNovaEntradaSaida}
        editando={editando}
        setEditando={setEditando}
        indexEditando={indexEditando}
        setIndexEditando={setIndexEditando}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Pesquisa filtroPesquisa={filtroPesquisa} setFiltroPesquisa={setFiltroPesquisa} />
        <button type="button" onClick={abrirRelatorio}>Gerar Relatório</button>
      </div>
      <Listagem
        entradaSaida={entradaSaidaOrdenada.filter((entrada) => {
          return (
            (entrada.entrada && entrada.entrada.includes(filtroPesquisa)) ||
            (entrada.saida && entrada.saida.includes(filtroPesquisa))
          );
        })}
        entradaSaidaOriginal={entradaSaida}
        filtroPesquisa={filtroPesquisa}
        setEditando={setEditando}
        setIndexEditando={setIndexEditando}
        setNovaEntradaSaida={setNovaEntradaSaida}
        setEntradaSaida={setEntradaSaida}
      />
      <Relatorio entradaSaida={entradaSaida} isOpen={isOpenRelatorio} onRequestClose={fecharRelatorio} />
    </div>
  );
};

export default App;
