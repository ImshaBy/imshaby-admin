import React, { SyntheticEvent } from 'react';
import DatePicker from 'react-datepicker';
import be from 'date-fns/locale/be';

import './stylesheets/datepicker.scss';

interface IProps {
  onChange: (date: Date | null) => void;
  selected: Date | null;
  minDate?: Date | null,
  maxDate?: Date | null,
}

const DateTimePicker = ({
  onChange, selected, minDate, maxDate,
}: IProps) => {
  const handleChange = (date: Date | [Date, Date] | null, e: SyntheticEvent) => {
    e.stopPropagation();
    if (Array.isArray(date)) {
      return;
    }
    onChange(date);
  };

  return (
    <>
      <DatePicker
        locale={be}
        dateFormat="dd/MM/yyyy"
        selected={selected}
        onKeyDown={(e) => { e.preventDefault(); }}
        onChange={handleChange}
        minDate={minDate}
        maxDate={maxDate}
      />
    </>
  );
};

export default DateTimePicker;
