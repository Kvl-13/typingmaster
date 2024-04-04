const dummyString = "The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam erat volutpat. Integer id lorem vitae lectus rutrum ullamcorper vel non leo. Suspendisse eget metus nec ex sagittis hendrerit. Vivamus vel mi nec arcu aliquet bibendum eu vel eros. Fusce eget velit sit amet quam varius consequat. Sed ut sapien id diam luctus accumsan. Mauris mattis, risus et fermentum convallis, arcu turpis fermentum mauris, a mattis ipsum lacus at enim. Ut vitae placerat leo. Sed in sapien sit amet orci consequat tincidunt. Nunc id justo at justo placerat tempus."

export const randomText = (setText, length) => {
    try {
        let demo = dummyString.split(" ").map((value) => { return value });
        let temp = "";
        const max = demo.length;
        const min = 0;
        const textLen = 15;

        for (let index = 0; index < textLen; index++) {
            let i = Math.floor(Math.random() * (max - min) + min);

            if ((index + 1) < textLen)
                temp += demo[i] + '-';
            else
                temp += demo[i];
        }

        temp = temp.replace(/[0-9{}":,.;']/g, '');
        temp = temp.toLowerCase();

        setText(temp);
        length.current = temp.length;
    } catch (error) {
        console.log(error)
    }
}

export const handleRestartBtn = (setText, length, randomText, handleFocus, setTime, setCharIndex, setErrorCount, setLetterCount, setWrongChar, charRefs,setIsTyping,inputRef) => {
    randomText(setText, length);
    handleFocus(setIsTyping, inputRef);
    setTime(60);
    setCharIndex(0);
    setErrorCount(0);
    setLetterCount(0);
    setWrongChar(Array(charRefs.current.length).fill(' '));
}

export const handleBlur = (setIsTyping) => {
    setIsTyping(false);
}

export const handleFocus = (setIsTyping, inputRef) => {
    // Due to stale closure problem write this code
    setIsTyping(prevIsTyping => {
        if (!prevIsTyping) {
            inputRef.current.focus();
            return true;
        }
        return prevIsTyping; // Return the current value without changes
    });
}

export const handleInputChange = (e, charRefs, charIndex, length, wrongChar, setWrongChar, setText, setErrorCount, setWordCount, setCharIndex, setLetterCount, randomText, errorCount, wordCount, letterCount) => {
    const characters = charRefs.current;
    const currentChar = characters[charIndex];
    let typedChar = e.target.value.slice(-1);

    if (charIndex < characters.length) {

        if (typedChar == currentChar.textContent || typedChar === " " && currentChar.textContent === "-") {
            let temp = wrongChar;
            temp[charIndex] = "correct";
            setWrongChar(temp);
        }
        else {
            let temp = wrongChar;
            temp[charIndex] = "wrong";
            setWrongChar(temp);
            console.log("error")
            setErrorCount(errorCount + 1);
        }

        if (currentChar.textContent === "-") {
            setWordCount(wordCount + 1);
        }

        setCharIndex(charIndex + 1);
        setLetterCount(letterCount + 1);

        if (charIndex === (length.current - 1)) {
            randomText(setText, length);
            setCharIndex(0);
            setWrongChar(Array(charRefs.current.length).fill(' '));
        }
    }
}