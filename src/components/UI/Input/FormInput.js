import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './Input.module.css';
import PropTypes from 'prop-types';

export const FormInput = ({
  register,
  error,
  label,
  id,
  inputtype,
  min,
  max,
  ...inputProps
}) => {
  const { t } = useTranslation();
  let errorMessageCount = null;
  let inputElement = null;

  console.log(error);

  if (error) {
    switch (error.type) {
      case 'max':
        errorMessageCount = { count: max };
        break;
      case 'min':
        errorMessageCount = { count: min };
        break;
    }
  }

  switch (inputtype) {
    case 'textarea':
      inputElement = <textarea id={id} ref={register} {...inputProps} />;
      break;

    default:
      inputElement = <input id={id} ref={register} {...inputProps} />;
  }

  FormInput.propTypes = {
    register: PropTypes.func,
    error: PropTypes.object,
    label: PropTypes.string,
    id: PropTypes.string,
    inputtype: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
  };

  return (
    <div className={classes.Input}>
      <label className={classes.Label} htmlFor={id}>
        {label}
      </label>
      {inputElement}
      {error && (
        <div className={classes.ValidationMessage}>
          {t(`${error.message}`, errorMessageCount)}
        </div>
      )}
    </div>
  );
};
