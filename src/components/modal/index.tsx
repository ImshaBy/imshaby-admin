import './style.scss';

import React, {
  ReactNode, useEffect, useRef,
} from 'react';

import useOutsideClick from '../../utils/useOutsideClick';

interface IProps {
  visible: boolean;
  children?: ReactNode;
  onClose: () => void;
  turnOffOutsideClick?: boolean;
}

const Modal = ({ visible, children, onClose, turnOffOutsideClick }: IProps) => {
  const nodeRef = useRef(null);

  useOutsideClick(nodeRef, () => {
    if (!turnOffOutsideClick) {
      onClose();
    }
  });

  const handleClick = (e: MouseEvent) => {
    // @ts-ignore: Object is possibly 'null'
    if (!(nodeRef.current).contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, false);
    return document.removeEventListener('click', handleClick, false);
  }, []);

  useEffect(() => {
    document.querySelector('body')?.classList.toggle('fixed', visible);
  }, [visible]);

  if (!visible) return <></>;
  return (
    <>
      <section className="modal-wrapper">
        <section className="modal" ref={nodeRef}>
          { children }
        </section>
      </section>
    </>
  );
};

export default Modal;
