import React, { useState } from 'react';
import Modal from 'react-modal';

const Relatorio = ({ entradaSaida, isOpen, onRequestClose }) => {
  const [dataRelatorio, setDataRelatorio] = useState(new Date().toISOString().slice(0, 10));
  const [relatorio, setRelatorio] = useState([]);

  const gerarRelatorio = () => {
    const relatorioFiltrado = entradaSaida.filter((entrada) => {
      return (
        (entrada.entrada && entrada.entrada.includes(dataRelatorio)) ||
        (entrada.saida && entrada.saida.includes(dataRelatorio))
      );
    });
    setRelatorio(relatorioFiltrado);
  };

  const copiarRelatorio = () => {
    const textoRelatorio = relatorio.map((entrada) => {
      return `Nome: ${entrada.nome}\nEntrada: ${entrada.entrada}\nSaída: ${entrada.saida}\n`;
    }).join('\n\n');
    navigator.clipboard.writeText(textoRelatorio);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Relatório</h2>
      <input
        type="date"
        value={dataRelatorio}
        onChange={(e) => setDataRelatorio(e.target.value)}
      />
      <button type="button" onClick={gerarRelatorio}>
        Gerar Relatório
      </button>
      {relatorio.length > 0 && (
        <div>
          <h3>Relatório do dia {dataRelatorio}</h3>
          <ul>
            {relatorio.map((entrada, index) => (
              <li key={index}>
                <p>Nome: {entrada.nome}</p>
                <p>Entrada: {entrada.entrada}</p>
                <p>Saída: {entrada.saida}</p>
              </li>
            ))}
          </ul>
          <button type="button" onClick={copiarRelatorio}>
            Copiar Relatório
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Relatorio;
                                  
