import { useEffect, useState } from "react";

const Exercise02 = () => {
  const [pessoa, setPessoa] = useState({ nome: "", telefone: 0 });
  const [validations, setValidations] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => console.log(pessoa));

  const handleChange = (e) => {
    setPessoa((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value, }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pessoa.nome === "" || pessoa.telefone === "") {
      setValidations("Campo nome e telefone são obrigatórios.");
    } else {
      setValidations("");
      setFormData(pessoa);
    }
  };

  return (
    <div className="container">
      <h1>Exercise02</h1>
      <form onSubmit={handleSubmit}>
        <input name="nome" type="text" value={pessoa.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="telefone" type="number" value={pessoa.telefone} onChange={handleChange} placeholder="Telefone" required />
        <button type="submit">Enviar</button>
        <p style={{ color: "red", }}>{validations}</p>
        {Object.keys(formData).length > 0 && Object.keys(formData).map((item, idx) => <p key={idx}>{item}: {formData[item]}</p>)}
      </form>
    </div>
  );
};

export default Exercise02;