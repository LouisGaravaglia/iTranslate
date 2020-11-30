import React, {useEffect, useState} from "react";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import IosArrowUp from 'react-ionicons/lib/IosArrowUp';
import Hover from "./Hover";


const ToTopArrow = ({topRef, topInView}) => {
  const [hitBottom, setHitBottom] = useState(false);
  const [movingUp, setMovingUp] = useState(false);
  const translation = useSelector(store => store.translation);
  const dispatch = useDispatch();
  const history = useHistory();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //SET STATE TO TRUE ONCE TRANSLATION IS DISPLAYED IN STORE SO THAT A RETURN TO TOP ARROW APPEARS
  useEffect(() => {

    const updateSetHitBottom = () => {

      if (translation) {
        setHitBottom(true);
      };
    };
    updateSetHitBottom();
  }, [translation, setHitBottom]);

  //ONCE THE REF OF TOP MOST DIV, WHICH IS PASSED IN AS PROP, IS IN VIEW, RESET REDUX STORE
  useEffect(() => {

    const resetStoreReachingTop = () => {

      if (movingUp && topInView) {
        history.push("/browse");
        setMovingUp(false);
        dispatch(resetStore("artists", "albums", "tracks", "lyrics", "translation", "searchResults", "selectedTrack"));
      };
    };
    resetStoreReachingTop();
  }, [movingUp, topInView, dispatch, setMovingUp]);

////////////////////////////////////////////////////  HANDLE CLICK FUNCTION  ////////////////////////////////////////////////////

  const handleClick = () => {
    topRef.current.scrollIntoView({behavior: "smooth"});
    setHitBottom(false);
    setMovingUp(true);
  };

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div className="TopArrow-Container">
      <div className="TopArrow-Box">
        {!hitBottom && <div></div>}
        <Hover scale={1.20}>
          {hitBottom && <IosArrowUp  className="TopArrow"  onClick={handleClick} fontSize="100px" color="#fff"/>}
        </Hover>
      </div>
    </div>
  );
};

export default ToTopArrow;