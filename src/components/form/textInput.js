// TextInput.js
import React from 'react';
import PropTypes from 'prop-types';
import './textInput.css'; // Make sure the path to your CSS file is correct

export const TextInput = ({
    label,
    type,
    error,
    assistiveText,
    onChange,
    value,
    placeholder,
    disabled,
    multiline,
    id // add an id prop
  }) => {
    const inputClass = error ? 'input-error' : 'input-regular';
    const assistiveClass = `assistive-text ${inputClass}`;
    const InputComponent = multiline ? 'textarea' : 'input';
  
    return (
      <div className="text-inputs">
        {label && (
          <label htmlFor={id} className="text-wrapper">
            {label}
          </label>
        )}
        <div className={`input-field ${inputClass}`}>
          <InputComponent
            id={id} // associate the input with the label
            type={type}
            className="type-here"
            placeholder={placeholder || (error ? '' : 'Type here')}
            onChange={onChange}
            value={value}
            disabled={disabled}
            aria-label={label} // accessibility label
          />
        </div>
        {assistiveText && <div className={assistiveClass}>{assistiveText}</div>}
      </div>
    );
  };
  

TextInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool,
  assistiveText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
};

TextInput.defaultProps = {
  type: 'text',
  error: false,
  assistiveText: '',
  disabled: false,
  multiline: false,
};
