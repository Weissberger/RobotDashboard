import React from 'react';

import './TextInput.css'

const TextInput = (props) => {
    const {updateFunc, type, placeholder} = props;
    return (
        <input 
            className='textInput p-2' 
            type={type}
            placeholder={placeholder}
            onChange={e=> updateFunc(e.target.value)}
        >
        </input>
    )
}
export default TextInput;