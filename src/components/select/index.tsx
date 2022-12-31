import './style.scss';

import { Button, MenuItem, Select as SelectMUI } from '@mui/material';
import React, { MouseEventHandler } from 'react';

import { Parish } from '../../models/parish/types';

interface SelectProps {
  value: string,
  onChange?: (e: { target: { value: string } }) => void,
  options: Parish[],
  btnDisabled?: boolean,
  btnTitle?: string,
  btnClick?: MouseEventHandler<HTMLButtonElement>

}

const Select = ({
  value,
  onChange,
  options,
  btnDisabled,
  btnTitle,
  btnClick,
}: SelectProps) => {
  const items = options.map(
    (data: Parish) => <MenuItem style={{ whiteSpace: 'normal' }} value={data.id}>{ data.name }</MenuItem>,
  );

  return (
    <div className="select__container">
      <SelectMUI
        value={value}
        onChange={onChange}
        className="select__select"
      >
        { items }
      </SelectMUI>
      <Button
        variant="contained"
        onClick={btnClick}
        disabled={btnDisabled}
        className="select__btn"
      >
        {btnTitle}
      </Button>
    </div>
  );
};

export default Select;
