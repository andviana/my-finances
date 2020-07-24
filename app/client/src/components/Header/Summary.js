import React from 'react';
import css from './header.module.css';
import { toMoney } from '../../helper/stringUtils';

export default function Summary({ summary }) {
  const { receitas, despesas, saldo } = summary;
  const classSaldo = saldo >= 0 ? css.summaryGreen : css.summaryRed;
  return (
    <div className={css.summaryDivContainer}>
      {/* receitas */}
      <div className={css.summaryDiv} style={{ borderColor: '#358c74' }}>
        <i className="small material-icons green-text">trending_up</i>
        <div className={css.summaryDivColumn}>
          <span className={css.summaryLabel}>Receitas: </span>
          <span className={css.summaryGreen}>{toMoney(receitas)}</span>
        </div>
      </div>
      {/* despesas */}
      <div className={css.summaryDiv} style={{ borderColor: '#f14b4e' }}>
        <i className="small material-icons red-text">trending_down</i>
        <div className={css.summaryDivColumn}>
          <span className={css.summaryLabel}>Despesas: </span>
          <span className={css.summaryRed}>{toMoney(despesas)}</span>
        </div>
      </div>
      {/* saldo */}
      <div className={css.summaryDiv} style={{ borderColor: '#0984e3' }}>
        <i className="small material-icons blue-text">attach_money</i>
        <div className={css.summaryDivColumn}>
          <span className={css.summaryLabel}>Saldo: </span>
          <span className={classSaldo}>{toMoney(saldo)}</span>
        </div>
      </div>
    </div>
  );
}
