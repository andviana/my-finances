import React from 'react';
import css from './header.module.css';

export default function Lancamentos({ summary, onClickAddNew }) {
  const handleClickAddNew = () => {
    onClickAddNew();
  };

  const { lancamentos } = summary;
  return (
    <div className={css.summaryDivContainer}>
      {/* total lancamentos */}
      <div className={css.lancamentosDivLancamentosContainer}>
        <div className={css.lancamentoDivPill}>{'lançamentos'}</div>
        <span className={css.lancamentoText}>{lancamentos}</span>
      </div>
      {/* botao adicionar lancamento */}
      <div
        className="btn-large btn-floating waves-light"
        onClick={handleClickAddNew}
      >
        <i className="large material-icons ">add</i>
      </div>
    </div>
  );
}
