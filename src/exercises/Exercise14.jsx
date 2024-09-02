import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { insertPessoa, listPessoas, removePessoa, updatePessoa } from "../crud";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'nome', headerName: 'Nome', width: 230 },
  { field: 'email', headerName: 'Email', width: 300 },
  { field: 'telefone', headerName: 'Telefone', type: 'number', width: 200 },
];

const isNotEmpty = (object) => Object.keys(object).length > 0;

const Exercise14 = () => {
  const { register, handleSubmit, reset, getValues, setValue, formState : { errors } } = useForm();
  const [formData, setFormData] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  // useEffect(() => console.log(getValues()));

  useEffect(() => {

    // console.log(selectedData);

    if (isNotEmpty(selectedData)) {
      
      setValue("nome", selectedData.nome);
      setValue("email", selectedData.email);
      setValue("telefone", selectedData.telefone);

    } else {
      reset();
    }

  }, [selectedData]);

  const onSubmit = async (data) => {
    await insertPessoa(data);
    await handleList();
    reset();
  };

  const handleList = async () => {

    const data = await listPessoas();
    // console.log(Object.keys(data[0]));
    setFormData(data);

  };

  const handleClick = async (data) => {

    setSelectedData(data.row);
    // console.log(data.row);

  };

  const handleRemove = async () => {

    if (isNotEmpty(selectedData)) {
      await removePessoa(selectedData.id);
      await handleList();
      setSelectedData("");
    }

  };

  const handleUpdate = async () => {

    if (isNotEmpty(selectedData)) {
      // console.log(getValues());
      await updatePessoa({ id: selectedData.id, ...getValues() });
      await handleList();
      setSelectedData("");
    }

  };

  return (
    <div className="container">
      <h1>Exercise14</h1>
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
        <button type="submit">Registrar</button>
        <button type="button" onClick={handleUpdate}>Atualizar</button>
        <button type="button" onClick={handleRemove}>Excluir</button>
        {errors?.nome && <p>{errors.nome.message}</p>}
        {errors?.email && <p>{errors.email.message}</p>}
        {errors?.telefone && <p>{errors.telefone.message}</p>}
        <br/><br />
        <button style={{ display: "block", margin: "5px auto" }} type="button" onClick={handleList}>Listar Usuários no Banco de Dados</button>
        {formData.length > 0 && <DataGrid 
          rows={formData}
          columns={columns}
          onRowClick={handleClick}
          // checkboxSelection
        />}
      </form>
    </div>
  );
};

export default Exercise14;