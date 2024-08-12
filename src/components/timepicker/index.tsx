import './style.scss';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker as MuiTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

interface props {
  hour?: string | null;
  minute?: string | null;
  onChange: (hour: string, minute: string) => void;
}

const TimePicker = ({ hour, minute, onChange }: props) => {
  const handleChange = (value: string) => {
    const newTime = moment(value, 'HH:mm');
    if (newTime.isValid()) {
      onChange(`0${newTime.hour()}`.slice(-2), `0${newTime.minute()}`.slice(-2));
    }
  };

  return (
    <section className="timePicker">
      <LocalizationProvider
        dateAdapter={AdapterMoment}
        localeText={{ fieldHoursPlaceholder: () => '__', fieldMinutesPlaceholder: () => '__' }}
      >
        <MuiTimePicker
          value={moment(`${hour}:${minute}`, 'HH:mm')}
          onChange={(value) => {
            handleChange(value as any);
          }}
          disableOpenPicker
          ampm={false}
        />
      </LocalizationProvider>
    </section>
  );
};

export default TimePicker;
