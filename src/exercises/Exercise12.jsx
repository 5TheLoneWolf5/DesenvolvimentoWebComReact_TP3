import React, { useEffect, useState } from "react";

const Exercise12 = () => {

  const [ufs, setUfs] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {

    const fetchUfs = async () => {

      await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then((data) => data.json())
      .then((data) => {

        setUfs(data);

      });
      
    };

    fetchUfs();
    
  }, []);

  const handleUf = async (e) => {

    if (e.target.value) {

      await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e.target.value}/municipios`)
      .then((data) => data.json())
      .then((data) => {

        setMunicipios(data);

      });
      
    }
    
  };
  
  return (
    <div>
      <h1>Exercise12</h1>
      <div style={{ display: "flex", gap: "55px", alignItems: "center" }}>
        <label>
          UF: 
          <select onChange={handleUf} defaultValue={"Default"}>
            <option value="Default" disabled>Selecione...</option>
            {ufs.map((uf, idx) => (
              <option key={idx} value={uf.id}>{uf.nome}</option>
            ))}
          </select>
        </label>
        <label>
          Municípios: 
          <select>
            {municipios.map((municipio, idx) => <option key={idx}>{municipio.nome}</option>)}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Exercise12;