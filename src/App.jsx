import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from "react"
import KeyboardLayout from "./components/KeyboardLayout"
import { handleRestartBtn, handleBlur, randomText, handleInputChange, handleFocus } from "./features/function";
import Details from "./components/Details";
import Text from "./components/Text";

function App() {
  // To contain text and loading functionality
  const [text, setText] = useState("");
  const length = useRef(0);

  // For handling current character & word
  const [isTyping, setIsTyping] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [wrongChar, setWrongChar] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const inputRef = useRef(null);
  const charRefs = useRef([]);

  // For time handling
  const [time, setTime] = useState(60);

  // To monitor current letter using input field
  const handleChange = (e) => {
    handleInputChange(e, charRefs, charIndex, length, wrongChar, setWrongChar, setText, setErrorCount, setWordCount, setCharIndex, setLetterCount, randomText, errorCount, wordCount, letterCount);
  }

  // To restart the practice
  const handleRestart = () => {
    handleRestartBtn(setText, length, randomText, handleFocus, setTime, setCharIndex, setErrorCount, setLetterCount, setWrongChar, charRefs, setIsTyping, inputRef);
  }

  // For working of time 
  useEffect(() => {
    let interval;

    if (time > 0 && isTyping) {
      interval = setInterval(() => {
        setTime(old => old - 1);
      }, 1000);
    }
    else if (time == 0) {
      clearInterval(interval);
      handleBlur(setIsTyping);
      inputRef.current.blur();
    }

    return () => clearInterval(interval);
  }, [time, isTyping]);

  // To initialize text for practice
  useEffect(() => {
    randomText(setText, length);
    // To initialie with empty string of count wrong and right typed letter 
    setWrongChar(Array(charRefs.current.length).fill(' '));
  }, [])

  return (
    <>
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100" >
        
        <Text inputRef={inputRef} handleChange={handleChange} handleFocus={handleFocus} setIsTyping={setIsTyping} handleBlur={handleBlur} text={text} charIndex={charIndex} wrongChar={wrongChar} charRefs={charRefs} isTyping={isTyping} time={time} />

        <Details time={time} wordCount={wordCount} letterCount={letterCount} errorCount={errorCount} handleRestart={handleRestart} />

        <KeyboardLayout text={text} length={length} randomText={randomText} setIsTyping={setIsTyping} inputRef={inputRef} />

      </div>
    </>
  )
}

export default App
