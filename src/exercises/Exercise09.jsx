import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { insertPessoa } from "../crud";

const Exercise09 = () => {
  const { register, handleSubmit, getValues, formState : { errors } } = useForm();
  const [formData, setFormData] = useState("");

  useEffect(() => console.log(getValues()));

  const onSubmit = async (data) => {
    setFormData(JSON.stringify(data));
    await insertPessoa(data);
  };

  return (
    <div className="container">
      <h1>Exercise09</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("nome", {
          required: "Campo nome é obrigatório",
        })} type="text" placeholder="Nome" />
        <input {...register("email", {
          required: "Campo email é obrigatório",
          validate: {
            matchPattern: (item) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(item) || "Email não é válido.",
          }
        })} placeholder="Email" />
        <input {...register("telefone", {
          required: "Campo telefone é obrigatório",
          validate: {
            matchPattern: (item) => (/^[0-9]*$/g).test(item) || "Telefone precisa ser número.",
          }
        })} type="text" placeholder="Telefone" />
        <button type="submit">Enviar</button>
        {errors?.nome && <p>{errors.nome.message}</p>}
        {errors?.email && <p>{errors.email.message}</p>}
        {errors?.telefone && <p>{errors.telefone.message}</p>}
        <p>{formData}</p>
      </form>
    </div>
  );
};

export default Exercise09;