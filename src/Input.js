import React from "react";

const Input = ( { onChange, value, ...rest } ) => (
    <input className={ rest.className } type="text" onChange={ event => onChange( event.target.value ) } value={ value } { ...rest }/>
)

export default Input;