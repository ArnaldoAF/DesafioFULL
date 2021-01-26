import React, { InputHTMLAttributes, useState } from 'react';

import './styles.css';

import eyeClosedIcon from '../../assets/images/icons/eye-closed.svg';
import eyeOpenIcon from '../../assets/images/icons/eye-open.svg';

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    type?: string;
}

const MaterialInput = React.forwardRef<HTMLInputElement,InputProps>((props, ref) => {
    const {
        name,
        label,
        type,
        ...rest
    } =props;
    

    const [isPasswordState, setIsPasswordState] = useState(type === "password");

    const isPasswordConst = (type === "password");

    function toggleIsPasswordState() {
        setIsPasswordState(!isPasswordState);
    }


    return(
        <div className="input-box">
            <div className="input-container">
                <input  
                    type={isPasswordConst   ? (isPasswordState ? "password" : "text")
                                            :   (type || "text")
                    } 
                    id={name} 
                    name={name}
                    className="input" 
                    pattern=".+"  
                    placeholder=" "
                    ref={ref}
                    {...rest}/>
                
                <label htmlFor={name} className="label">{label}</label>
                {(isPasswordConst) && (
                    <img 
                        src={isPasswordState ? eyeOpenIcon : eyeClosedIcon} 
                        alt="" 
                        className="eye"
                        onMouseDown={() => setIsPasswordState(false)}
                        onMouseUp={() => setIsPasswordState(true)}
                        onMouseLeave={() => setIsPasswordState(true)}
                        onTouchStart={() => setIsPasswordState(false)}
                        onTouchEnd={() => setIsPasswordState(true)}
                        onTouchMove={() => setIsPasswordState(true)}
                        
                        />
                )}
            </div>
            </div>
    )
});

export default MaterialInput;