import React from 'react';
import css from './transactions.module.css';
import { toMoney } from '../../helper/stringUtils';
import Action from '../Action';

export default function TransactionActions({ transaction, onDelete, onEdit }) {
  const { id, value } = transaction;
  const handleActionClick = (id, type) => {
    if (type === 'delete') {
      onDelete(id);
      return;
    }
    if (type === 'edit') {
      onEdit(id);
    }
  };
  return (
    <div className={css.actionsRowDiv}>
      <div>
        <span className={css.actionTextValue}>{toMoney(value)}</span>
      </div>
      <div className={css.actionsRowButtonDiv}>
        <div className={css.actionsButton}>
          <Action onActionClick={handleActionClick} id={id} type={'edit'} />
        </div>
        <div className={css.actionsButton}>
          <Action onActionClick={handleActionClick} id={id} type={'delete'} />
        </div>
      </div>
    </div>
  );
}
