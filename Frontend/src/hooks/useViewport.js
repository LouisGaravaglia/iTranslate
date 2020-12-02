import {useState, useEffect} from "react";

/**
* Hook to constantly monitor viewport dimensions so that I can change make any
* changes to state or react variables for responsive design.
*/
const useViewport = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {

    const handleWindowResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return {viewportWidth, viewportHeight};
};

export default useViewport;