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
  multiline
}) => {
  const inputClass = error ? 'input-error' : 'input-regular';
  const assistiveClass = `assistive-text ${inputClass}`;
  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className="text-inputs">
      {label && <div className="text-wrapper">{label}</div>}
      <div className={`input-field ${inputClass}`}>
        <InputComponent
          type={type}
          className="type-here"
          placeholder={placeholder || (error ? '' : 'Type here')}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
        {/* {type !== 'file' && (
          <img
            className="icon"
            alt="Icon"
            src={error ? 'icon-2.svg' : 'icon.svg'}
          />
        )} */}
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
