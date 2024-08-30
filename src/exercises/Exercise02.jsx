import React, { useReducer } from "react";

const Exercise02 = () => {

  const reducerFunction = (state, action) => {

    switch (action.type) {
      case "add": {
        return {
          ...state, 
          idade: state.idade + 1 
        };
      }
      case "remove": {
        return {
          ...state, 
          idade: state.idade - 1 
        };
      }
        // "break" is not needed;
    };

  };

  const [pessoa, dispatcher] = useReducer(reducerFunction, { nome: "Adam", idade: 10 });

  return (
    <div className="container">
      <h1>Exercise02</h1>
      <span>{pessoa?.idade}</span>
      <br />
      <button onClick={() => dispatcher( { type: "add" } )}>+</button>
      <button onClick={() => dispatcher( { type: "remove" } )}>-</button>
    </div>
  );
};

export default Exercise02;
