import React from 'react';
import { useField, ErrorMessage } from 'formik';
import './InputField.css'; // We will create this CSS

const InputField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-group">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input
                className={`form-input ${meta.touched && meta.error ? 'is-invalid' : ''}`}
                {...field}
                {...props}
            />
            <ErrorMessage name={props.name} component="div" className="error-message inline" />
        </div>
    );
};

export default InputField;
