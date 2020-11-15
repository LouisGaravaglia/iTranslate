import React, { useEffect } from 'react';

const FlashMessage = ( { message, duration, setState} ) => {

  const toggleTimer = () => {
    setState(false);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      toggleTimer();
    }, duration)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div onClick={toggleTimer} className="FlashMessage">
      <p>{message}</p>
    </div>
  );

};

export default FlashMessage;