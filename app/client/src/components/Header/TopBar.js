import React from 'react';
import Summary from './Summary';
import Lancamentos from './Lancamentos';
import css from './header.module.css';
import MonthYearCombo from './MonthYearCombo';

export default function TopBar({
  summary,
  monthYear,
  monthYearItems,
  onChangeMonthYear,
  onClickAddNew,
}) {
  return (
    <div className={css.summaryDivContainer}>
      <Summary summary={summary} />
      <MonthYearCombo
        monthYear={monthYear}
        monthYearItems={monthYearItems}
        onChangeMonthYear={onChangeMonthYear}
      />
      <Lancamentos summary={summary} onClickAddNew={onClickAddNew} />
    </div>
  );
}
