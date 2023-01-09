import React, { useEffect } from 'react';

const ESCAPE_KEY = 'Escape';

const useOutsideClick = (ref: React.RefObject<any>, callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code !== ESCAPE_KEY) return;
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, false);
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('click', handleClick, false);
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, []);
};

export default useOutsideClick;
