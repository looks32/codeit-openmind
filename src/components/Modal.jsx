import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const ModalWrap = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal_layer {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  > div {
    position: absolute;
    width: 400px;
    height: 600px;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
  }

  button {
    position: absolute;
    right: 10px;
    top: 10px;
    border: none;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
  }
`;

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <ModalWrap>
      <div className="modal_layer" onClick={onClose}></div>
      <div>
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </ModalWrap>,
    document.getElementById('modal-root')
  );
}

export default Modal;
