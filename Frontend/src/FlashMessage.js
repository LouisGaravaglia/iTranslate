import React, { useEffect } from 'react';

const FlashMessage = ( { message, setState} ) => {

  const toggleTimer = () => {
    setState(false);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      toggleTimer();
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div onClick={toggleTimer} className="FlashMessage">
      <p>{message}</p>
    </div>
  );

};

export default FlashMessage;