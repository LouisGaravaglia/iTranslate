import React, { useEffect } from 'react';

const FlashMessage = ( { message, setState} ) => {

  const toggleTimer = () => {
    setState(false);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setState(false);
    }, 5000)

    return () => clearInterval(intervalId)
  }, [setState])

  return (
    <div onClick={toggleTimer} className="FlashMessage">
      <p>{message}</p>
    </div>
  );

};

export default FlashMessage;