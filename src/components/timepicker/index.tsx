import './style.scss';

import { TextField } from '@mui/material';
import moment from 'moment';
import React, { ChangeEvent, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import TimeField from 'react-simple-timefield';

interface props {
  hour?: string | null;
  minute?: string | null;
  onChange: (hour: string, minute: string) => void;
}

const TimePicker = ({ hour, minute, onChange }: props) => {
  // const [active, setActive] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    const newTime = moment(value, 'HH:mm');
    if (newTime.isValid()) {
      onChange(
        (`0${newTime.hour()}`).slice(-2),
        (`0${newTime.minute()}`).slice(-2),
      );
    }
  };

  // const handleFocus = (event: ChangeEvent) => {
  //   setActive(true);
  // };

  const inputComponent = (
    <TextField
      placeholder="09:00"
      className="timePicker__field"
      color="error"
      InputProps={{
        className: 'timePicker__field__input',
      }}
      // onFocus={handleFocus}
    />
  );

  return (
    <section className="timePicker">
      <TimeField
        value={moment(`${hour || 0}:${minute || 0}`, 'HH:mm').format('HH:mm')}
        onChange={handleChange}
        input={inputComponent}
      />
    </section>
  );
};

export default TimePicker;
