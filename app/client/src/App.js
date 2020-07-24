import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import InputFilter from './components/Header/InputFilter';
import Transactions from './components/Transactions/Transactions';
import Jumbotron from './components/Jumbotron';
import ModalTransaction from './components/ModalTransaction/ModalTransaction';
import TopBar from './components/Header/TopBar';
import M from 'materialize-css';
import {
  getMonthYearList,
  getPeriod,
  deleteTransaction,
  updateTransaction,
  insertTransaction,
} from './service/apiService';
import { calculateSummary } from './helper/helper';
import { removerAcentos } from './helper/stringUtils';

export default function App() {
  const [monthYear, setMonthYear] = useState('');
  const [summary, setSummary] = useState({
    lancamentos: 0,
    receitas: 0,
    despesas: 0,
    saldo: 0,
  });
  const [monthYearItems, setMonthYearItems] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState({
    description: '',
    category: '',
    type: '',
    value: '',
    yearMonthDay: '',
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getDistinctMonthYear = async () => {
      try {
        const response = await getMonthYearList();
        setMonthYearItems(response);
      } catch (e) {
        throw new Error(e).message;
      }
    };
    if (!monthYearItems) {
      getDistinctMonthYear();
    }
  }, [monthYearItems]);

  useEffect(() => {
    const getPeriodList = async (value) => {
      try {
        const response = await getPeriod(value);
        setAllTransactions(Object.assign([], response));
        setTransactions(Object.assign([], response));
      } catch (e) {
        throw new Error(e).message;
      }
    };
    if (monthYear) getPeriodList(monthYear);
  }, [monthYear]);

  useEffect(() => {
    if (allTransactions && filter !== '') {
      const result = allTransactions.filter((item) =>
        item.descriptionLowerCase.includes(removerAcentos(filter.toLowerCase()))
      );
      setTransactions(result);
    } else if (filter === '') {
      setTransactions(Object.assign([], allTransactions));
    }
  }, [filter, allTransactions]);

  useEffect(() => {
    if (transactions) {
      const localSummary = calculateSummary(transactions);
      setSummary(localSummary);
    }
  }, [transactions]);

  const handleChangeMonthYear = (value) => {
    setMonthYear(value);
  };
  const handleCloseTransaction = () => {
    setModalOpen(false);
  };
  const handleClickAddNew = () => {
    setSelectedTransaction({
      description: '',
      category: '',
      type: '',
      value: '',
      yearMonthDay: '',
    });
    setModalOpen(true);
  };
  const handleActionEdit = (id) => {
    const register = transactions.filter((transaction) => {
      return transaction.id === id;
    });
    setSelectedTransaction(register[0]);
    setModalOpen(true);
  };
  const handleActionDelete = async (id) => {
    const response = await deleteTransaction(id);
    updateLocalTransactions();
    M.toast({ html: `${response.message}` });
  };

  const updateLocalTransactions = () => {
    const getPeriodList = async (value) => {
      try {
        const response = await getPeriod(value);
        setAllTransactions(Object.assign([], response));
        if (filter !== '') {
          const filtered = response.filter((item) =>
            item.descriptionLowerCase.includes(
              removerAcentos(filter.toLowerCase())
            )
          );
          setTransactions(filtered);
        } else if (filter === '') {
          setTransactions(Object.assign([], response));
        }
      } catch (e) {
        throw new Error(e).message;
      }
    };
    getPeriodList(monthYear);
  };

  const handlePersistTransaction = async (body) => {
    try {
      if (body.editMode) {
        const { id, editMode, ...values } = body;
        const response = await updateTransaction(id, values);
        updateLocalTransactions();
        setSelectedTransaction(response);
        M.toast({ html: 'alterações salvas com sucesso!' });
        setModalOpen(false);
      } else {
        const { editMode, ...values } = body;
        const response = await insertTransaction(values);
        updateLocalTransactions();
        setSelectedTransaction(response);
        M.toast({ html: 'transação salva com sucesso!' });
        setModalOpen(false);
      }
    } catch (e) {
      throw new Error(e);
    }
  };
  const handleChangeFilter = (value) => {
    setFilter(value);
  };
  return (
    <div>
      <Jumbotron>
        <Header />
      </Jumbotron>
      {monthYearItems && (
        <TopBar
          summary={summary}
          monthYear={monthYear}
          monthYearItems={monthYearItems}
          onChangeMonthYear={handleChangeMonthYear}
          onClickAddNew={handleClickAddNew}
        />
      )}
      <div className="container center">
        <InputFilter filter={filter} onChangeFilter={handleChangeFilter} />
        {transactions && (
          <Transactions
            transactions={transactions}
            onDelete={handleActionDelete}
            onEdit={handleActionEdit}
          />
        )}
      </div>
      {isModalOpen && (
        <ModalTransaction
          onSaveTransaction={handlePersistTransaction}
          onCloseTransaction={handleCloseTransaction}
          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
