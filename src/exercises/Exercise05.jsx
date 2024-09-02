import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Exercise05 = () => {
  const { register, handleSubmit, getValues, formState : { errors } } = useForm();
  const [formData, setFormData] = useState({});

  useEffect(() => console.log(getValues()));

  const onSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="container">
      <h1>Exercise05</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("nome") } type="text" placeholder="Nome" />
        <input {...register("telefone", {
          validate: {
            matchPattern: (item) => (/^[0-9]*$/g).test(item) || "Telefone precisa ser número.",
          }
        })} type="text" placeholder="Telefone" />
        <button type="submit">Enviar</button>
        {errors?.nome && <p>{errors.nome.message}</p>}
        {errors?.telefone && <p>{errors.telefone.message}</p>}
        {Object.keys(formData).length > 0 && Object.keys(formData).map((item, idx) => <p key={idx}>{item}: {formData[item]}</p>)}
      </form>
    </div>
  );
};

export default Exercise05;