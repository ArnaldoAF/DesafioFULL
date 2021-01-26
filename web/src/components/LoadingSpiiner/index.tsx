import React from 'react';
import loadingIcon from '../../assets/images/icons/loading-icon.svg';
import './styles.css';

interface LoadingSpinnerProps {
    size:number;
}

const LoadingSpinner:React.FC<LoadingSpinnerProps> = (props) => {
    const {size} = props;
    const sizeInRem = size+"rem";
    return (
        
        <img 
            className="spinner" 
            src={loadingIcon} 
            alt=""
            style={{width: sizeInRem}}
        />
        
    )
}

export default LoadingSpinner;