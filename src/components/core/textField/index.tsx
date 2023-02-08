/* eslint-disable react/jsx-props-no-spreading */
import './style.scss';

import React from 'react';

const TextField = ({
  ...props
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => (
  <div className="core__textField__field__base">
    <input {...props} type="text" />
  </div>
);

export default TextField;
