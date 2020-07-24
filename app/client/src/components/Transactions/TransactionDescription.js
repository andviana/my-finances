import React from 'react';
import css from './transactions.module.css';
import { padLeft } from '../../helper/stringUtils';

export default function TransactionDescription({ transaction }) {
  const { day, category, description } = transaction;
  return (
    <div className={css.descriptionRowDiv}>
      <div>
        <span className={css.descriptionTextDay}>{padLeft(day, 2)}</span>
      </div>
      <div className={css.descriptionColumnDiv}>
        <div>
          <span className={css.descriptionTextCategory}>{category}</span>
        </div>
        <div>
          <span className={css.descriptionTextDescription}>{description}</span>
        </div>
      </div>
    </div>
  );
}
