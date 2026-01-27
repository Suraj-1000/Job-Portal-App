import { forwardRef } from 'react';
import './FormInput.css';

const FormInput = forwardRef(({ label, error, containerClassName, ...props }, ref) => {
    return (
        <div className={`form-group ${containerClassName || ''}`}>
            {label && <label htmlFor={props.id || props.name}>{label}</label>}
            <input
                ref={ref}
                className={`form-input ${error ? 'is-invalid' : ''}`}
                {...props}
            />
            {error && <div className="error-message inline">{error.message}</div>}
        </div>
    );
});

FormInput.displayName = 'FormInput';

export default FormInput;
