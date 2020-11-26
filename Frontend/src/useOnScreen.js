import {useState, useEffect} from "react";

  function useOnScreen(ref, options={threshold: 0.3}) {
    // STATE AND SETTER FOR STORING WHETER ELEMENT IS VISIBLE
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        // UPDATE OUR STATE WHEN OBSERVER CALLBACK FIRES
        setIntersecting(entry.isIntersecting);
      }, options);

      if (ref.current) {
        observer.observe(ref.current);
      };

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        };
      };
    }, [ref, options]); 
    return isIntersecting;
  };

export default useOnScreen;