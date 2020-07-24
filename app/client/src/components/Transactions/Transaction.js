import React from 'react';
import TransactionDescription from './TransactionDescription';
import TransactionActions from './TransactionActions';
import css from './transactions.module.css';

export default function Transaction({ transaction, onDelete, onEdit }) {
  const classTransaction =
    transaction.type === '+'
      ? css.transactionDivGreen
      : transaction.type === '-'
      ? css.transactionDivRed
      : css.transactionDivYellow;
  return (
    <div className={classTransaction}>
      <TransactionDescription transaction={transaction} />
      <TransactionActions
        transaction={transaction}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}
