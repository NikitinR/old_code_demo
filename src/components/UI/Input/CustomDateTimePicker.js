import React from 'react';

import { Controller } from 'react-hook-form';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

export const CustomDateTimePicker = ({
  dateTimePickerName,
  dateTimePickerControl,
  dateTimePickerLabel,
  dateTimePickerOffset,
}) => {
  CustomDateTimePicker.propTypes = {
    dateTimePickerName: PropTypes.string,
    dateTimePickerControl: PropTypes.object,
    dateTimePickerLabel: PropTypes.string,
    dateTimePickerOffset: PropTypes.string,
  };
  return (
    <div className={classes.Input}>
      <Controller
        control={dateTimePickerControl}
        render={({ onChange, onBlur, value }) => (
          <DateTimePicker
            format="MM/DD/yyyy HH:mm"
            showTodayButton
            rules={{ required: true }}
            disablePast
            label={dateTimePickerLabel}
            autoOk
            ampm={false}
            className={classes.CustomDateTimePicker}
            onBlur={onBlur}
            onChange={(value) => onChange(value)}
            value={value}
          />
        )}
        defaultValue={moment().add(dateTimePickerOffset, 'h')}
        name={dateTimePickerName}
      />
    </div>
  );
};
