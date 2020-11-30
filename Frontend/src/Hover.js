import React, {useEffect, useState} from "react";
import { animated, useSpring } from 'react-spring';

const Hover = ({x = 0, y = 0, rotation = 0, scale = 1.05, timing = 150, children, navbar = false}) => {
  const [isBooped, setIsBooped] = useState(false);
  const style = useSpring({
    display: 'inline-block',
    transform: isBooped && !navbar
      ? `scale(${scale})`
      : `scale(1)`,
    transform: isBooped && navbar
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: {
      tension: 300,
      friction: 10,
    },
  });

  useEffect(() => {

    if (!isBooped) {
      return;
    };

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);


  const trigger = () => {
    setIsBooped(true);
  };


  return (
    <animated.span className="Hover-Box" onMouseEnter={trigger} style={style}>
      {children}
    </animated.span>
  );
};

export default Hover;