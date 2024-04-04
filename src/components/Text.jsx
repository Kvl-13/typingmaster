import React from 'react'

export default function Text(props) {
    const { inputRef, handleChange, handleFocus, setIsTyping, handleBlur, text, charIndex, wrongChar, charRefs, isTyping, time } = props;
    return (
        <div className="mb-2 w-100 h-25">
            <div className="content w-100">
                <input type="text" className="input-field d-block" ref={inputRef} onChange={handleChange} onFocus={() => handleFocus(setIsTyping, inputRef)} onBlur={() => handleBlur(setIsTyping)} />
                {
                    text.split('').map((i, index) => {
                        return <span

                            className={`char ${index === charIndex ? 'ul' : ''} ${wrongChar[index] == "wrong" ? " wrong" : ''}`}

                            key={index} id={index} ref={(e) => charRefs.current[index] = e} >{i}
                        </span>
                    })
                }
                {
                    isTyping ? '' : <div className="overlay fw-bold" style={{ color: "#f8961e", fontSize: "1.4rem" }}>{time === 0 ? "Time up click restart to start" : "Press Enter to Activate"}</div>
                }
            </div>
        </div>
    )
}
