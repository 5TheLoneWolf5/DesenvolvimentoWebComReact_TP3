import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Exercise06 = () => {
  const { register, handleSubmit, getValues, formState : { errors } } = useForm();
  const [formData, setFormData] = useState("");

  useEffect(() => console.log(getValues()));

  const onSubmit = (data) => {
    setFormData(JSON.stringify(data));
  };

  return (
    <div className="container">
      <h1>Exercise06</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("nome") } type="text" placeholder="Nome" />
        <input {...register("telefone", {
          validate: {
            matchPattern: (item) => (/^[0-9]*$/g).test(item) || "Telefone precisa ser número.",
          }
        })} type="number" placeholder="Telefone" />
        <button type="submit">Enviar</button>
        {errors?.nome && <p>{errors.nome.message}</p>}
        {errors?.telefone && <p>{errors.telefone.message}</p>}
        <p>{formData}</p>
      </form>
    </div>
  );
};

export default Exercise06;