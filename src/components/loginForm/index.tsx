import React from 'react';
import './style.scss';

interface Props {
  onSubmit: (event: any) => void,
  message: string,
  isError: boolean,
}

const LoginForm = ({
  onSubmit,
  message,
  isError,
}: Props) => {
  return (
    <div className="login_form_container">
      <form className="login" data-bitwarden-watching="1" onSubmit={onSubmit}>
        <span className="login__title" >
          Account Login
        </span>
        <div className={`login__message ${isError ? 'error' : ''}`}>
          {message || ''}
        </div>
        <div className="email" data-validate="Valid email is required: ex@abc.xyz">
          <input className="email__input" type="text" name="email" required placeholder="Email" />
        </div>

        <div className="login__signin">
          <button className="login__signin__btn">
            Sign in
          </button>
        </div>
      </form>
  </div>
  )
};

export default LoginForm;
