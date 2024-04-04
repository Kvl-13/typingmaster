import React from 'react'

export default function KeysComp(props) {
    const { k } = props;

    return (
        <button className='button mb-2'  id={k.key.toLowerCase()}>{k.key}</button>
    )
}
