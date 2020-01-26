import React from "react";

const Input = ( { onChange, value, ...rest } ) => (
    <input className={ rest.className } type="text" onChange={ event => onChange( event.target.value ) } placeholder="Enter a mixer username" value={ value }></input>
)

export default Input;