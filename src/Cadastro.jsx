// Cadastro.js
import React from 'react';

const Cadastro = ({
  entradaSaida,
  setEntradaSaida,
  novaEntradaSaida,
  setNovaEntradaSaida,
  editando,
  setEditando,
  indexEditando,
  setIndexEditando,
}) => {
  const adicionarEntradaSaida = () => {
    setEntradaSaida([...entradaSaida, novaEntradaSaida]);
    setNovaEntradaSaida({
      nome: '',
      obs: '',
      entrada: '',
      saida: '',
    });
  };

  const salvarEntradaSaida = () => {
    const novaLista = entradaSaida.map((entrada, i) => {
      if (i === indexEditando) {
        return novaEntradaSaida;
      }
      return entrada;
    });
    setEntradaSaida(novaLista);
    setEditando(false);
    setIndexEditando(null);
    setNovaEntradaSaida({
      nome: '',
      obs: '',
      entrada: '',
      saida: '',
    });
  };

  return (
  <form className="form-fixo">
    <datalist id="nomes">
      {entradaSaida.map((entrada) => (
        <option key={entrada.nome} value={entrada.nome} />
      ))}
    </datalist>
    <input
      type="text"
      name="nome"
      list="nomes"
      value={novaEntradaSaida.nome}
      onChange={(event) =>
        setNovaEntradaSaida({ ...novaEntradaSaida, nome: event.target.value })
      }
      placeholder="Nome"
    />
    <input
      type="text"
      name="obs"
      value={novaEntradaSaida.obs}
      onChange={(event) =>
        setNovaEntradaSaida({ ...novaEntradaSaida, obs: event.target.value })
      }
      placeholder="Observações"
    />
    <input
      type="datetime-local"
      name="entrada"
      value={novaEntradaSaida.entrada}
      onChange={(event) =>
        setNovaEntradaSaida({ ...novaEntradaSaida, entrada: event.target.value })
      }
      placeholder="Entrada"
    />
    <input
      type="datetime-local"
      name="saida"
      value={novaEntradaSaida.saida}
      onChange={(event) =>
        setNovaEntradaSaida({ ...novaEntradaSaida, saida: event.target.value })
      }
      placeholder="Saída"
    />
    <button
      type="button"
      onClick={() => {
        if (editando) {
          salvarEntradaSaida();
        } else {
          adicionarEntradaSaida();
        }
      }}
    >
      {editando ? "Salvar" : "Adicionar"}
    </button>
    {editando && (
      <button
        type="button"
        onClick={() => {
          setEditando(false);
          setIndexEditando(null);
          setNovaEntradaSaida({
            nome: "",
            obs: "",
            entrada: "",
            saida: "",
          });
        }}
      >
        Cancelar
      </button>
    )}
  </form>
);
};
export default Cadastro;
