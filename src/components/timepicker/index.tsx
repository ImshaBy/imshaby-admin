import React, { useEffect, useState } from 'react';
import './style.scss';

interface props {
  hour?: string;
  minute?: string;
  onChange: (hour: string, minute: string) => void;
}

const ALLOWED_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

const TimePicker = ({ hour, minute, onChange } : props) => {
  const [hours, setHours] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');

  useEffect(() => {
    setHours(hour || '');
    setMinutes(minute || '');
  }, [hour, minute])

  const handleKeyDownHours = (e: React.KeyboardEvent) => {
    if (isNaN(Number(e.key)) && !ALLOWED_KEYS.includes(e.key)) {
      e.preventDefault();
      return;
    }
  }

  const handleChangeHours = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 2 || Number(e.currentTarget.value) > 23) {
      return;
    }
    setHours(e.currentTarget.value);
  }

  const handleChangeMinutes = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 2 || Number(e.currentTarget.value) > 59) {
      return;
    }
    setMinutes(e.currentTarget.value);
  }

  const handleBlurHours = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 1) {
      setHours(`0${e.currentTarget.value}`);
      onChange(hours, minutes)
    }
  }

  const handleBlurMinutes = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 1) {
      setMinutes(`0${e.currentTarget.value}`);
    }
  }

  return (
    <section className={'timePicker'}>
      <input className={`timePicker__hours`} value={hours} placeholder="09" pattern="\d*"
             onKeyDownCapture={handleKeyDownHours}
             onChange={handleChangeHours}
             onBlurCapture={handleBlurHours}
      />
      <span className={'timePicker__separator'}>:</span>
      <input className={`timePicker__minutes`} value={minutes} placeholder="30" pattern="\d*"
             onKeyDownCapture={handleKeyDownHours}
             onChange={handleChangeMinutes}
             onBlurCapture={handleBlurMinutes}
      />
    </section>
  );
};

export default TimePicker;
