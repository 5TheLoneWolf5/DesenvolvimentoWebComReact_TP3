import { useState } from "react";
import { useForm } from "react-hook-form";
import { logarUsuario } from "../auth";

const Exercise15 = () => {

  const { register, handleSubmit, reset, getValues, setValue, formState : { errors } } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {

    await logarUsuario(data.email, data.password)
    .then(() => {
      setMessage("Usuário com email de " + data.email + " logado com sucesso.");
      reset();
    })
    .catch((response) => setMessage(`Erro no login: ${response.message}`));

  };

  return (
    <div className="container">
      <h1>Exercise15</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", {
          required: "Campo email é obrigatório",
          validate: {
            matchPattern: (item) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(item) || "Email não é válido.",
          }
        })} placeholder="Email" />
        <input {...register("password", {
          required: "Campo senha é obrigatório",
        })} type="password" placeholder="Senha" />
        <button type="submit">Logar</button>
        <div style={{ color: "red" }}>
          {errors?.email && <p>{errors.email.message}</p>}
          {errors?.senha && <p>{errors.senha.message}</p>}
        </div>
        <p>{message}</p>
        <br/>
      </form>
    </div>
  );
};

export default Exercise15;