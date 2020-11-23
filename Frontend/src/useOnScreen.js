import { useState, useEffect } from "react";

  function useOnScreen(ref, options={threshold: 0.3}) {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      }, options);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        };
      };
    }, [ref, options]); // Empty array ensures that effect is only run on mount and unmount

    return isIntersecting;
  };

export default useOnScreen;