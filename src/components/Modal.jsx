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
`;

const ModalBody = styled.div`
  position: absolute;
  width: 612px;
  height: 454px;
  border-radius: 24px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    width: 327px;
    height: 568px;
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
      <ModalBody>{children}</ModalBody>
    </ModalWrap>,
    document.getElementById('modal-root')
  );
}

export default Modal;
