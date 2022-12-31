import './style.scss';

import React from 'react';

interface Props {
  onSubmit: (event: any) => void,
}

const LoginForm = ({
  onSubmit,
}: Props) => (
  <div className="login_form_container">
    <form className="login" data-bitwarden-watching="1" onSubmit={onSubmit}>
      <span className="login__title">
        Account Login
      </span>
      <div className="email" data-validate="Valid email is required: ex@abc.xyz">
        <input className="email__input" type="text" name="email" required placeholder="Email" />
      </div>

      <div className="login__signin">
        <button type="submit" className="login__signin__btn">
          Sign in
        </button>
      </div>
    </form>
  </div>
);

export default LoginForm;
