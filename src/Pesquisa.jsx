import React from 'react';

const Pesquisa = ({ filtroPesquisa, setFiltroPesquisa }) => {
  return (
    <input
      type="date"
      value={filtroPesquisa}
      onChange={(e) => setFiltroPesquisa(e.target.value)}
    />
  );
};

export default Pesquisa;
