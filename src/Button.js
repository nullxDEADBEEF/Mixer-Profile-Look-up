import React from "react";

const Button = ( { onClick, children, ...rest } ) => (
    <button className={ rest.className } type="text" onClick={ onClick }>{ children }</button>
)

export default Button;