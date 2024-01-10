/* eslint-disable import/prefer-default-export */

export const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9]+([.-]?\w+)*@[a-z]+\.[a-z]{2,3}$/;
  return regex.test(email);
};
