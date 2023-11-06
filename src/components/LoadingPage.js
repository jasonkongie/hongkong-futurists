import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import './LoadingPage.css';

const LoadingPage = ({ strings = ['Loading...'], typeSpeed = 100, backSpeed = 50, loop = true }) => {
  const el = useRef(null);

  useEffect(() => {
    const typedOptions = {
      strings,
      typeSpeed,
      backSpeed,
      loop,
    };

    const typed = new Typed(el.current, typedOptions);

    return () => {
      typed.destroy();
    };
  }, [strings, typeSpeed, backSpeed, loop]);

  return (
      <div className="loading-element">
        <span ref={el}></span>
      </div>
  );
};

export default LoadingPage;
