import React, {useState, ReactNode}  from 'react';

type RepeatComponentPropTypes = {
  children: ReactNode,
  initialN: number,
  controllable: boolean
}

function RepeatComponent({children, initialN, controllable}: RepeatComponentPropTypes) {
  const [n, setN] = useState(initialN);

  function handleClick(adjustment: number) {
    if (controllable) {
      setN(n+adjustment);
    }
  }

  return (<>{
    Array(n).fill(0).map(() => (<>{children}</>))
  }{
    controllable && <>
      <button onClick={() => handleClick(1)}>More</button>
      <button onClick={() => handleClick(-1)}>Less</button>
    </>
  }</>);
}

export default RepeatComponent;
