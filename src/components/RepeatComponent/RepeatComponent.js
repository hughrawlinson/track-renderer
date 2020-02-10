import React, {useState}  from 'react';

function RepeatComponent({children, initialN, controllable}) {
  const [n, setN] = useState(initialN);

  function handleClick(adjustment) {
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
