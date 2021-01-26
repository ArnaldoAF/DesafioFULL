import React, { ReactHTML, ButtonHTMLAttributes } from 'react';

import './styles.css'; 
import { Link, LinkProps } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string;
    to?:string;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {
        to,
        ...rest} = props;

    return (
        <>
        {to == undefined ? (
            <button className="button" {...rest} >
            {props.children}
            </button>
        ) : (
            <Link to={to || "/"} className="button"  >
                <button   {...rest} >
                    {props.children}
                </button>
            </Link>
        ) }
        
        </>
    )
}

export default Button;