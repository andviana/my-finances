import React from 'react';
import css from './header.module.css';

export default function InputFilter({ filter, onChangeFilter }) {
  const handleChangeFilter = (event) => {
    onChangeFilter(event.target.value);
  };
  return (
    <div className={css.InputFilterDivContainer}>
      <div>
        <i className=" medium material-icons left grey-text">search</i>
      </div>
      <div className="input-field" style={{ flexGrow: 1, padding: '10px' }}>
        <input
          placeholder="Informe uma descrição para filtrar os registros"
          type="text"
          id="inputFilter"
          value={filter}
          onChange={handleChangeFilter}
        />
      </div>
    </div>
  );
}
