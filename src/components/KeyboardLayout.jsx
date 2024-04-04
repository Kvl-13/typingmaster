import React, { useCallback, useEffect } from 'react'
import KeysComp from './KeysComp';
import { handleFocus } from '../features/function';


export default function KeyboardLayout(props) {
    const { length, setIsTyping, inputRef } = props;

    const keysArr = [
        { key: 'Q' },
        { key: 'W' },
        { key: 'E' },
        { key: 'R' },
        { key: 'T' },
        { key: 'Y' },
        { key: 'U' },
        { key: 'I' },
        { key: 'O' },
        { key: 'P' }, //Row 1
        { key: 'A' },
        { key: 'S' },
        { key: 'D' },
        { key: 'F' },
        { key: 'G' },
        { key: 'H' },
        { key: 'J' },
        { key: 'K' },
        { key: 'L' }, // Row 2
        { key: 'Z' },
        { key: 'X' },
        { key: 'C' },
        { key: 'V' },
        { key: 'B' },
        { key: 'N' },
        { key: 'M' }, // Row 3
    ];

    // Used to highlight the key is press  
    const onPress = useCallback((e) => {
        let k = e.key;

        try {
            let currKey = document.getElementById(`${k}`);

            if ((currKey || k === " ") && length.current !== 0) {
                addClass(k, currKey);
            }

            // Used to make text in focus
            if (k === "Enter") {
                handleFocus(setIsTyping, inputRef);
            }

        } catch (error) {
            console.log(error);
        }

    }, []);

    // Used to add class when button is press
    const addClass = (k, currKey) => {
        if (k) {
            if (currKey)
                currKey.classList.add("active");
        }
    }

    // Used to remove class from button when press is release
    const onUp = useCallback((e) => {
        let k = e.key;
        let key = document.getElementById(`${k}`);

        if (key) {
            key.classList.remove("active");
        }
    }, []);


    useEffect(() => {
        window.addEventListener('keydown', onPress);
        window.addEventListener('keyup', onUp);

        return () => {
            window.removeEventListener('keydown', onPress);
            window.removeEventListener('keyup', onUp);
        };
    }, []);


    return (
        <div className='w-100 d-flex flex-column'>
            <div className='w-100 d-flex justify-content-center gap-2'>
                {
                    keysArr.slice(0, 10).map((k, index) => {
                        return <KeysComp key={index} k={k} />
                    })
                }
            </div>
            <div className='w-100 d-flex justify-content-center gap-2'>
                {
                    keysArr.slice(10, 19).map((k, index) => {
                        return <KeysComp key={index} k={k} />
                    })
                }
            </div>
            <div className='w-100 d-flex justify-content-center gap-2'>
                {
                    keysArr.slice(19, 26).map((k, index) => {
                        return <KeysComp key={index} k={k} />
                    })
                }
            </div>
            <div className='w-100 d-flex justify-content-center gap-2'>
                {
                    keysArr.slice(26).map((k, index) => {
                        return <KeysComp key={index} k={k} />
                    })
                }
            </div>
        </div>
    )
}
