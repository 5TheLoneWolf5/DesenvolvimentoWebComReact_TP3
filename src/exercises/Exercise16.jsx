import React, { useState } from "react";

const Exercise16 = () => {

  const [inputCep, setInputCep] = useState("");
  const [cep, setCep] = useState({});
  const [error, setError] = useState("");

  const validateCEP = () => {

    if (!isNaN(inputCep) && inputCep.length === 8) {
      return true;
    }
    
    return false;

  };

  const handleSearch = async () => {

    if (validateCEP()) {

      let result = {};

      await fetch(`https://viacep.com.br/ws/${inputCep}/json/`)
        .then((response) => {

          console.log(response);

          if (response.status === 200) {
            return response.json();
          } else {
            return setError("Requisição inválida.");
          }
        }
        )
        .then((data) => {
          if (data?.erro) {
            setError("CEP não encontrado.");
          } else {
            result = data;
            setError("");
          }
        })
        .catch((error) => setError(`Erro: ${error.message}`));

    setCep(result);

    } else {

      setError("Este CEP não é válido!");

    }

  };

  const handleInputCep = (e) => {
    setInputCep(e.target.value);
  };

  return (
    <div>
      <h1>Exercise16</h1>
      <input value={inputCep} onChange={handleInputCep} placeholder="Digite o CEP aqui."/>
      <button onClick={handleSearch}>Buscar CEP</button>
      <div style={{ textAlign: "center" }}>
        { error ? <p style={{ color: "red" }}>{error}</p> : Object.entries(cep).map((item, idx) => (
          <div key={idx}>
            <strong>{item[0].charAt(0).toUpperCase() + item[0].slice(1)}:</strong> {item[1]}<br /><br />
          </div>
          )) 
        }
      </div>
    </div>
  );
};

export default Exercise16;