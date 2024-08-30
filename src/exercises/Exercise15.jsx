import React, { useEffect, useState } from "react";

const Exercise15 = () => {

  const [inputFilter, setInputFilter] = useState("");
  const [ufs, setUfs] = useState([]);

  useEffect(() => {

    const loadMunicipios = async (id) => {

      let result = null;

      await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
      .then((data) => data.json())
      .then((data) => {

        result = data;
        // The return needs to be done outside.

      });

      return result;

    };

    const fetchUfs = async () => {

      let result = null;

      await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then((data) => data.json())
      .then((data) => {
        result = data;
      });

      // The promise needs to be concluded in order to be rendered. So, putting the loop in here so it gets awaited (it needs to be at the top level).
      for (let i = 0; i < result.length; i++) {

        const municipiosUf = await loadMunicipios(result[i].id);
        result[i] = { ...result[i], municipios: municipiosUf };

        // loadMunicipios(data[i].id);
      }

      setUfs(result);

    };

    fetchUfs();

  }, []);

  const handleInputFilter = (e) => {
    setInputFilter(e.target.value);
  };

  return (
    <div>
      <h1>Exercise15</h1>
      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <input value={inputFilter} onChange={handleInputFilter} placeholder="Filtre os municípios." />
        <label>Escolha:</label>
          <select>
            { ufs?.map((uf, i) => {
                // console.log(uf.municipios);
                return <optgroup key={i} label={uf.nome}>
                  {uf?.municipios.map((municipio, j) => (
                    municipio.nome.toLowerCase().includes(inputFilter.toLowerCase()) || !inputFilter ?
                    <option key={j}>{municipio.nome}</option> : null
                  ))}
                </optgroup>
              })
            }
          </select>
      </div>
    </div>
  );
};

export default Exercise15;