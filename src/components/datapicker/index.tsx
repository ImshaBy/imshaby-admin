import './stylesheets/datepicker.scss';

import { registerLocale } from 'react-datepicker';
import { be } from 'date-fns/locale/be';
import { SyntheticEvent } from 'react';
import DatePicker from 'react-datepicker';
registerLocale('be', be)

interface IProps {
  onChange: (date: Date | null) => void;
  selected: Date | null;
  minDate?: Date | null,
  maxDate?: Date | null,
}

const ReadonlyInput = ({ value, onClick }: any) => (
  <button type="button" onClick={onClick}>
    <input value={value} readOnly/>
  </button>
);

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
        locale='be'
        dateFormat="dd/MM/yyyy"
        selected={selected}
        onKeyDown={(e) => { e.preventDefault(); }}
        onChange={handleChange}
        customInput={<ReadonlyInput />}
        minDate={minDate}
        maxDate={maxDate}
        shouldCloseOnSelect={false}
      />
    </>
  );
};

export default DateTimePicker;
