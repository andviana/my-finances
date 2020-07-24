import React from 'react';
import css from './header.module.css';

export default function MonthYearCombo({
  monthYearItems,
  monthYear,
  onChangeMonthYear,
}) {
  const handleChangeMonthYear = (event) => {
    onChangeMonthYear(event.target.value);
  };

  return (
    <div className={css.monthYearComboRow}>
      <div className={css.monthYearComboItemDiv}>
        <label>
          <select
            className="browser-default"
            value={monthYear}
            onChange={handleChangeMonthYear}
            style={{ fontSize: '1rem' }}
          >
            <option value="" disabled>
              selecione uma opção
            </option>
            {monthYearItems.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
