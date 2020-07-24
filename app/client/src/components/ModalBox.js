import React, { useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalBox({ children, onCloseTransaction }) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onCloseTransaction();
    }
  };
  return (
    <div>
      <Modal isOpen={true} style={customStyles}>
        {children}
      </Modal>
    </div>
  );
}
