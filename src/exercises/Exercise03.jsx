import { useEffect, useState } from "react";

const Exercise03 = () => {
  const [pessoa, setPessoa] = useState({ nome: "", telefone: 0 });
  const [validations, setValidations] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => console.log(pessoa));

  const handleChange = (e) => {
    setPessoa((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value, }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidations([]);

    if (pessoa.nome === "" || pessoa.telefone === "" || pessoa.telefone === 0) {
      setValidations((prevData) => [...prevData, "Campo nome e telefone são obrigatórios."]);
    }

    // console.log(typeof pessoa.telefone);

    if (isNaN(pessoa.telefone)) {
      setValidations((prevData) => [...prevData, "Campo telefone deve ser número."]);
    }

    if (validations.length === 0) {
      setFormData(pessoa);
    }
  };

  return (
    <div className="container">
      <h1>Exercise03</h1>
      <form onSubmit={handleSubmit}>
        <input name="nome" type="text" value={pessoa.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="telefone" type="number" value={pessoa.telefone} onChange={handleChange} placeholder="Telefone" required />
        <button type="submit">Enviar</button>
        {validations.map((item, idx) => <p key={idx} style={{ color: "red", }}>{item}</p>)}
        {Object.keys(formData).length > 0 && Object.keys(formData).map((item, idx) => <p key={idx}>{item}: {formData[item]}</p>)}
      </form>
    </div>
  );
};

export default Exercise03;