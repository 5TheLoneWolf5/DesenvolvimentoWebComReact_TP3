import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Exercise04 = () => {
  const { register, handleSubmit, getValues } = useForm();
  const [formData, setFormData] = useState({});

  useEffect(() => console.log(getValues()));

  const onSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="container">
      <h1>Exercise04</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("nome")} type="text" placeholder="Nome" />
        <input {...register("telefone")} type="number" placeholder="Telefone" />
        <button type="submit">Enviar</button>
        {Object.keys(formData).length > 0 && Object.keys(formData).map((item, idx) => <p key={idx}>{item}: {formData[item]}</p>)}
      </form>
    </div>
  );
};

export default Exercise04;