// TextInput.js
import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.css'; // Make sure the path to your CSS file is correct

export const TextInput = ({ label, type, error, assistiveText, onChange }) => {
  const inputClass = error ? 'input-error' : 'input-regular';
  const assistiveClass = `assistive-text ${inputClass}`;

  return (
    <div className="text-inputs">
      <div className="text-wrapper">{label}</div>
      <div className={`input-field ${inputClass}`}>
        <input
          type={type}
          className="type-here"
          placeholder={error ? '' : 'Type here'}
          onChange={onChange}
        />
        <img
          className="icon"
          alt="Icon"
          src={error ? 'icon-2.svg' : 'icon.svg'}
        />
      </div>
      <div className={assistiveClass}>
        {assistiveText}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.bool,
  assistiveText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  type: 'text',
  error: false,
  assistiveText: '',
};
