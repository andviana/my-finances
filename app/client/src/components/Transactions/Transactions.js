import React from 'react';
import Transaction from './Transaction';

export default function Transactions({ transactions, onDelete, onEdit }) {
  return (
    <div>
      {transactions &&
        transactions.map((transaction) => {
          return (
            <div key={transaction.id}>
              <Transaction
                transaction={transaction}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </div>
          );
        })}
    </div>
  );
}
