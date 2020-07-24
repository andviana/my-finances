import React, { useState } from 'react';
import css from './modalTransaction.module.css';
import {
  getDay,
  getMonth,
  getYear,
  getYearMonth,
} from '../../helper/stringUtils';
import { transactionValidate } from '../../helper/validate';

export default function ModalTransactionForm({
  transaction,
  onFormSubmit,
  editMode,
}) {
  const [date, setDate] = useState(transaction.yearMonthDay);
  const [type, setType] = useState(transaction.type);
  const [description, setDescription] = useState(transaction.description);
  const [value, setValue] = useState(transaction.value);
  const [category, setCategory] = useState(transaction.category);
  const [errors, setErrors] = useState(null);
  const handleDateChange = (event) => {
    setDate(event.target.value.toString());
  };
  const handleOptionChange = (event) => {
    setType(event.target.value);
  };
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    let body = {
      description,
      category,
      value,
      yearMonthDay: date,
      day: getDay(date),
      month: getMonth(date),
      year: getYear(date),
      yearMonth: getYearMonth(date),
      type: type,
      editMode,
    };
    if (editMode) {
      body = {
        id: transaction.id,
        type: transaction.type,
        ...body,
      };
    }
    const errors = transactionValidate(body);
    if (!errors) onFormSubmit(body);
    else setErrors(errors);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className={css.modalContentDiv}>
          {/* radio button */}
          <div className={css.flexRow}>
            <p style={{ margin: '0 20px' }}>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value="-"
                  checked={type === '-'}
                  disabled={editMode}
                  onChange={handleOptionChange}
                />
                <span>Despesa</span>
              </label>
            </p>
            <p style={{ margin: '0 20px' }}>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value="+"
                  checked={type === '+'}
                  disabled={editMode}
                  onChange={handleOptionChange}
                />
                <span>Receita</span>
              </label>
            </p>
          </div>

          {/* input descricao */}
          <div className={css.flexColumn}>
            <div className="input-field" style={{ width: '100%' }}>
              <input
                type="text"
                id="inputDescription"
                value={description}
                onChange={handleDescriptionChange}
              />
              <label htmlFor="inputDescription" className="active">
                Descrição
              </label>
            </div>

            {/* input category */}
            <div className="input-field" style={{ width: '100%' }}>
              <input
                type="text"
                id="inputCategory"
                value={category}
                onChange={handleCategoryChange}
              />
              <label htmlFor="inputCategory" className="active">
                Categoria
              </label>
            </div>

            {/* input value */}
            <div className={css.flexRow} style={{ width: '100%' }}>
              <div className="input-field" style={{ width: '60%' }}>
                <input
                  type="text"
                  id="inputValue"
                  value={value}
                  onChange={handleValueChange}
                />
                <label htmlFor="inputValue" className="active">
                  Valor
                </label>
              </div>

              {/* inputa data */}
              <div
                className="input-field"
                style={{ marginLeft: '10px', width: '40%' }}
              >
                <input
                  type="date"
                  id="inputDate"
                  onChange={handleDateChange}
                  value={date}
                />
                <label htmlFor="inputValue" className="active">
                  Data
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={css.formErrorsText}>
          {errors &&
            errors.map((error, index) => {
              return (
                <div key={index}>
                  <span>
                    <i className="material-icons tiny">error</i>
                    {error}
                  </span>
                </div>
              );
            })}
        </div>
        {/* botão salvar */}
        <button
          className="btn waves-light green-4 right"
          style={{ marginTop: '10px' }}
          type="submit"
        >
          salvar
        </button>
      </form>
    </div>
  );
}
