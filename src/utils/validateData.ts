/* eslint-disable import/prefer-default-export */

export const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
