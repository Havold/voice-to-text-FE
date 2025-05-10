import React from 'react';
import { Link } from 'react-router-dom';
import './button.scss';

const Button = ({ url, onClick, bgColor = '#CEE0F1', color = 'black', children }) => {
    return (
        <Link style={{ width: 'fit-content', outline: 'none' }} to={url}>
            <button onClick={onClick} className="btn" style={{ color: color, backgroundColor: bgColor }}>
                {children}
            </button>
        </Link>
    );
};

export default Button;
