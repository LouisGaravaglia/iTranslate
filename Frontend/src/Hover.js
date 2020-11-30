import React, {useEffect, useState} from "react";
import {animated, useSpring} from 'react-spring';

const Hover = ({scale, timing = 150, children}) => {
  const [isHovered, setIsHovered] = useState(false);

  const style = useSpring({
    display: 'inline-block',
    transform: isHovered
      ? `scale(${scale})`
      : `scale(1)`,
    config: {
      tension: 300,
      friction: 10,
    },
  });

  useEffect(() => {

    if (!isHovered) {
      return;
    };

    const timeoutId = window.setTimeout(() => {
      setIsHovered(false);
    }, timing);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isHovered, timing]);

  const trigger = () => {
    setIsHovered(true);
  };

  return (
    <animated.span className="Hover-Box" onMouseEnter={trigger} style={style}>
      {children}
    </animated.span>
  );
};

export default Hover;