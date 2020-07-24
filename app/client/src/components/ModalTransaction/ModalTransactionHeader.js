import React from 'react';
import css from './modalTransaction.module.css';

export default function ModalTransactionHeader({ onCloseTransaction }) {
  const handleCloseTransaction = () => {
    onCloseTransaction();
  };
  return (
    <div className={css.modalTitleRowDiv}>
      <span className={css.modalTitle}>{'Inclusão de lançamento'}</span>
      <button className="btn waves-light red" onClick={handleCloseTransaction}>
        <i className="material-icons small">close</i>
      </button>
    </div>
  );
}
