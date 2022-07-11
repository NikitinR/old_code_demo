import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  switch (props.inputtype) {
    case 'input':
      inputElement = <input className={classes.inputElement} {...props} />;
      break;
    case 'textarea':
      inputElement = <textarea className={classes.inputElement} {...props} />;
      break;

    default:
      inputElement = <input className={classes.inputElement} {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

input.propTypes = {
  inputtype: PropTypes.string,
  label: PropTypes.string,
};

export default input;
