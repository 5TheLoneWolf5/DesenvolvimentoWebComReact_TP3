import React, { useMemo, useState } from "react";

const Exercise07 = () => {

  const [inputFactorial, setInputFactorial] = useState(0);

  const calculateFactorial = (number) => {

    if (number === 0) {
      return 1;
    }
    
    return number * calculateFactorial(number-1);
    
  };
  
  const resultFactorial = useMemo(() => calculateFactorial(+inputFactorial), [inputFactorial]);
  
  return (
    <div>
      <h1>Exercise07</h1>  
      <input type="number" value={inputFactorial} onChange={(e) => setInputFactorial(e.target.value)} />
      <p>{resultFactorial}</p>
    </div>
  );
};

export default Exercise07;
