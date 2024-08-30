import React, { useEffect, useState } from "react";

const Exercise16 = () => {

  const [inputFilter, setInputFilter] = useState("");
  const [nomes, setNomes] = useState([]);

  const handleSearch = async () => {

      let result = null;

      await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking/?decada=${inputFilter}`)
      .then((data) => data.json())
      .then((data) => {

        result = data[0].res;
        // The return needs to be done outside.

      })
      .catch((error) => console.log("Erro: " + error.message));

    setNomes(result);
    // console.log(result);

  };

  const handleInputFilter = (e) => {
    setInputFilter(e.target.value);
  };

  return (
    <div>
      <h1>Exercise16</h1>
      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <span>Digite um ano terminado em ZERO (década) para obter o ranking de frequência de nomes de brasileiros:</span>
        <input value={inputFilter} onChange={handleInputFilter} placeholder="Digite aqui." />
        <button onClick={handleSearch}>Pesquise Aqui</button>
      </div>
      <div style={{ textAlign: "center" }}>
        {nomes.map((item, idx) => <div key={idx}>
          {item.ranking}º<br />
          <strong>Nome: </strong>{item.nome}<br />
          <strong>Frequência: </strong>{item.frequencia}<br />
          <hr />
        </div>)}
      </div>
    </div>
  );
};

export default Exercise16;