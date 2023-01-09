import './style.scss';

import React from 'react';

import { CloseIcon } from '../icons';

interface IProps {
  children: React.ReactNode;
  onDismiss: () => void;
}

const Snackbar = ({
  children, onDismiss,
}: IProps) => {
  const handleClose = () => {
    onDismiss();
  };

  return (
    <div className="snackbar">
      <div className="snackbar__content">
        <div className="snackbar__text">{children}</div>
        <button type="button" className="snackbar__close" onClick={handleClose}>
          <CloseIcon className="snackbar__icon" />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
