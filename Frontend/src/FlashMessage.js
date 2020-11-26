import React, {useEffect} from 'react';

const FlashMessage = ({message, setState}) => {

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  useEffect(() => {

    const intervalId = setInterval(() => {
      setState(false);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [setState]);

////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

  const toggleTimer = () => {
    setState(false);
  }

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div onClick={toggleTimer} className="FlashMessage">
      <p>{message}</p>
    </div>
  );
};

export default FlashMessage;