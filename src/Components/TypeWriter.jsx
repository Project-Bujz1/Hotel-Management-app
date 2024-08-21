import React, { useState, useEffect } from 'react';
const Typewriter = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");
  
    useEffect(() => {
      let currentTextIndex = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, currentTextIndex + 1));
        currentTextIndex++;
        if (currentTextIndex === text.length) {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }, [text]);
  
    return <span>{displayedText}</span>;
  };

  export default Typewriter;