import React, {useEffect, useState, useRef, useCallback} from "react";
import {animated, useSpring} from 'react-spring';

const Hover = ({scale, timing = 150, children, previewURL='Not a Track'}) => {
  const [isHovered, setIsHovered] = useState(false);
  let audioVolume = 0.2;

  //IF THERE IS NO PREVIEW SONG AVAILABLE FROM SPOTIFY, SET IT TO A RANDOM SONG AND SET VOLUME TO 0.
  if (previewURL === 'No URL') {
    previewURL = 'https://p.scdn.co/mp3-preview/f08e6c437794cfbfd12669594dfe095229e3f538?cid=0ab9a52692fa489d8663530facb74af9'
    audioVolume = 0.0;
  };

  //REF FOR EACH AUDIO OBJECT THAT IS UNIQUE TO EACH TRACK SO THAT IT CAN PLAY/PAUSE ON MOUSE-ENTER MOUSE-LEAVE
  const audio = useRef(new Audio(previewURL));

  //BOUNCE ANIMATION CONFIGURATIONS
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

  //SET THE TIMER TO STOP THE ANIMATION AFTER A SET AMOUNT OF TIME
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

  //TRIGGER THE ANIMATION AND THE AUDIO ON MOUSE-ENTER
  const trigger = () => {
    setIsHovered(true);

    if (previewURL !== 'Not a Track') {
      audio.current.play();
      audio.current.volume = audioVolume;
    };
  };

  //PAUSE THE AUDIO ON MOUSE-LEAVE
  const stopMusic = () => {
    
    if (previewURL !== 'Not a Track') {
      audio.current.pause();
    };
  };

  return (
    <animated.span className="Hover-Box" onMouseEnter={trigger} onMouseLeave={stopMusic} style={style}>
      {children}
    </animated.span>
  );
};

export default Hover;