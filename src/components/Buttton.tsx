import { useEffect } from "react";
import { useState } from "react"

export function Button (){
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log(counter);
  }, [counter]);

  function increment(){
    setCounter(prev => prev + 1);
  }

  return (
    <button onClick={increment}>{counter}</button>
  )
}