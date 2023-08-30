import './style.scss';

// eslint-disable-next-line import/no-extraneous-dependencies
import { TimeField } from '@mui/x-date-pickers/TimeField';
import moment from 'moment';
import React from 'react';

interface props {
  hour?: string | null;
  minute?: string | null;
  onChange: (hour: string, minute: string) => void;
}

const TimePicker = ({ hour, minute, onChange }: props) => {
  const handleChange = (value: moment.Moment | null) => {
    if (value?.isValid) {
      onChange(
        (`0${value.hour()}`).slice(-2),
        (`0${value.minute()}`).slice(-2),
      );
    }
  };

  return (
    <section className="timePicker">
      <TimeField
        ampm={false}
        className="timePicker__field"
        color="error"
        InputProps={{
          className: 'timePicker__field__input',
        }}
        value={moment(`${hour}:${minute}`, 'HH:mm')}
        onChange={handleChange}
        // label="nikita"
        required
      />
    </section>
  );
};

export default TimePicker;
