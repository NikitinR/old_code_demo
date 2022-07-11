import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const button = (props) => (
  <button
    className={[classes.Button, classes[props.btntype]].join(' ')}
    {...props}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

button.propTypes = {
  children: PropTypes.node.isRequired,
  clicked: PropTypes.func,
  btntype: PropTypes.string,
};

export default button;
