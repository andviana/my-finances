import React from 'react';
import css from './header.module.css';

export default function Header() {
  return (
    <div className={css.headerRowDiv}>
      <div className={css.headerDivContainer}>
        <div className={css.headerDiv}>
          <span className={css.headerTitle}>Controle Financeiro Pessoal</span>
        </div>
        <div className={css.headerDiv}>
          <span className={css.headerSubtitle}>
            Bootcamp Full Stack - Desafio Final
          </span>
        </div>
      </div>
      <div className={css.headerIcon}>
        <i className="material-icons large">attach_money</i>
      </div>
    </div>
  );
}
