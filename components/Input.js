import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ onChange, value }) => (
  <div>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
