import React, { useState } from "react";

const Exercise01 = () => {
  const [pessoa, setPessoa] = useState({ nome: "Adam", idade: 10 });

  const handleAdd = () =>
    setPessoa((items) => ({ ...items, idade: items.idade + 1 }));

  const handleRemove = () =>
    setPessoa((items) => ({ ...items, idade: items.idade - 1 }));

  return (
    <div className="container">
      <h1>Exercise01</h1>
      <span>{pessoa?.idade}</span>
      <br />
      <button onClick={handleAdd}>+</button>
      <button onClick={handleRemove}>-</button>
    </div>
  );
};

export default Exercise01;