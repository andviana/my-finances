import React from 'react';
import Modal from 'react-modal';
import ModalTransactionForm from './ModalTransactionForm';
import ModalTransactionHeader from './ModalTransactionHeader';
import ModalBox from '../ModalBox';

Modal.setAppElement('#root');

export default function ModalTransaction({
  onSaveTransaction,
  onCloseTransaction,
  selectedTransaction,
}) {
  const { id } = selectedTransaction;
  const editMode = !id ? false : true;

  const handleCloseTransaction = () => {
    onCloseTransaction();
  };
  const handleFormSubmit = (body) => {
    onSaveTransaction(body);
  };

  return (
    <div>
      <ModalBox onCloseTransaction={handleCloseTransaction}>
        {/* titulo do modal */}
        <ModalTransactionHeader onCloseTransaction={handleCloseTransaction} />
        {/* formulario do modal */}
        <ModalTransactionForm
          transaction={selectedTransaction}
          onFormSubmit={handleFormSubmit}
          editMode={editMode}
        />
      </ModalBox>
    </div>
  );
}
