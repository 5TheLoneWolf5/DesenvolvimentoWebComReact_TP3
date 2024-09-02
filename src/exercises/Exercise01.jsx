import { useEffect, useState } from "react";

const Exercise01 = () => {
  const [pessoa, setPessoa] = useState({ nome: "", telefone: 0 });
  const [formData, setFormData] = useState({});

  useEffect(() => console.log(pessoa));

  const handleChange = (e) => {
    setPessoa((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value, }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(pessoa);
  };

  return (
    <div className="container">
      <h1>Exercise01</h1>
      <form onSubmit={handleSubmit}>
        <input name="nome" type="text" value={pessoa.nome} onChange={handleChange} placeholder="Nome" />
        <input name="telefone" type="number" value={pessoa.telefone} onChange={handleChange} placeholder="Telefone" />
        <button type="submit">Enviar</button>
        {Object.keys(formData).length > 0 && Object.keys(formData).map((item, idx) => <p key={idx}>{item}: {formData[item]}</p>)}
      </form>
    </div>
  );
};

export default Exercise01;