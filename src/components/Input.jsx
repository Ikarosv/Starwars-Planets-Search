import PropTypes from 'prop-types';
import React from 'react';

export default function Input({ type, ...props }) {
  return (
    <input type={ type || 'text' } { ...props } />
  );
}

Input.propTypes = {
  type: PropTypes.string,
}.isRequired;
