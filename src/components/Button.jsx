import PropTypes from 'prop-types';
import React from 'react';

export default function Button({ children, type, ...props }) {
  return (
    <button type={ type || 'button' } { ...props }>
      {children}
    </button>
  );
}

Button.propTypes = {
  innerText: PropTypes.shape(),
  type: PropTypes.string,
}.isRequired;
