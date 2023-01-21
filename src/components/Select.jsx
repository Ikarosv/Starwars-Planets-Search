import PropTypes from 'prop-types';
import React from 'react';

function Select({ options, ...props }) {
  return (
    <select { ...props }>
      {
        options.map((option, index) => (
          <option
            key={ option + index }
            defaultValue={ !index }
          >
            {option}
          </option>
        ))
      }
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.string,
}.isRequired;

export default Select;
