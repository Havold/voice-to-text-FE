import React from 'react';
import './inputField.scss';

const InputField = ({ onChange, label, name }) => {
    return (
        <div className="inputField">
            <label htmlFor={name}>{label}</label>
            <input name={name} onChange={onChange} id={name} placeholder={label} type="text" />
        </div>
    );
};

export default InputField;
