import './style.scss';

import { TextField } from '@mui/material';
import moment from 'moment';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IMask, IMaskInput } from 'react-imask';

interface props {
  hour?: string | null;
  minute?: string | null;
  onChange: (hour: string, minute: string) => void;
}

interface CustomProps {
  onChange: (value: string) => void;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;
    const onAccept = (value: string) => {
      const newValue = moment(value, 'HH:mm', true);
      if (newValue.isValid()) {
        onChange(value);
      }
    };
    return (
      <IMaskInput
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
        mask={Date}
        pattern="HH:MM"
        blocks={{
          HH: {
            mask: new IMask.MaskedRange({ from: 0, to: 23, lazy: false }),
          },
          MM: {
            mask: new IMask.MaskedRange({ from: 0, to: 59, lazy: false }),
          },
        }}
        inputRef={ref}
        // eslint-disable-next-line max-len
        onAccept={onAccept}
        overwrite
        lazy={false}
        // define date -> str convertion
        format={(date: any) => moment(date).format('HH:mm')}
        // define str -> date convertion
        parse={(str: string) => moment(str, 'HH:mm').toDate()}
      />
    );
  },
);

const TimePicker = ({ hour, minute, onChange }: props) => {
  const handleChange = (value: string) => {
    const newTime = moment(value, 'HH:mm');
    if (newTime.isValid()) {
      onChange(
        (`0${newTime.hour()}`).slice(-2),
        (`0${newTime.minute()}`).slice(-2),
      );
    }
  };

  return (
    <section className="timePicker">
      <TextField
        className="timePicker__field"
        value={moment(`${hour}:${minute}`, 'HH:mm').format('HH:mm')}
        InputProps={{
          className: 'timePicker__field__input',
          inputComponent: TextMaskCustom as any,
        }}
        color="error"
        onChange={(value) => handleChange(value as any)}
      />
    </section>
  );
};

export default TimePicker;
