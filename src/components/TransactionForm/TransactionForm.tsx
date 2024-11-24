import React, { MouseEventHandler, useState } from 'react';
import ButtonLoading from '../UI/ButtonLoading/ButtonLoading';
import { ITransactionForm } from '../../types';

interface TransactionFormProps {
  addNewTransaction: (newTransaction: ITransactionForm) => void;
  existingTransaction?: ITransactionForm;
  isEdit?: boolean;
  isLoading?: boolean;
  showModal?: MouseEventHandler<HTMLButtonElement>;
}

const initialState = {
  type: '',
  category: '',
  amount: 0,
};

const TransactionForm: React.FC<TransactionFormProps> = ({addNewTransaction, existingTransaction = initialState, isEdit = false, isLoading = false, showModal }) => {
  const [newTransaction, setNewTransaction] = useState<ITransactionForm>(existingTransaction);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setNewTransaction(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTransaction.type.trim().length === 0 && newTransaction.category.trim().length === 0 && newTransaction.amount < 0) {
      alert("Fill in the blank");
    } else {
      addNewTransaction({
        ...newTransaction,
        amount: Number(newTransaction.amount),
      });

      if (!isEdit) {
        setNewTransaction(initialState);
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Add new Transaction</h3>
        <div className='mb-2'>
          <label htmlFor=""><h5>Type: </h5></label>
          <select
            className="form-select"
            aria-label="Default select example"
            name='type'
            onChange={onChange}
            value={newTransaction.type}
          >
            <option selected>Choose type of your transaction</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </select>
        </div>

        <div className='form-group mb-2'>
          <label htmlFor="category">Category</label>
          {newTransaction.type === 'income' ? (
            <select
              className="form-select"
              aria-label="Default select example"
              name='category'
              onChange={onChange}
              value={newTransaction.category}
            >
              <option selected>Choose type of income transaction</option>
              <option value="salary">Salary</option>
              <option value="trading">Trading</option>
              <option value="bonus">Bonus</option>
            </select>
          ) : (
            <select
              className="form-select"
              aria-label="Default select example"
              name='category'
              onChange={onChange}
              value={newTransaction.category}
            >
              <option selected>Choose type of expenses transaction</option>
              <option value="food">Food</option>
              <option value="rent">Rent</option>
              <option value="education">Education</option>
            </select>
          )}
        </div>

        <div className='form-group mb-2'>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id='amount'
            name='amount'
            onChange={onChange}
            value={newTransaction.amount}
            className='form-control'
            required
          />
        </div>
        <div className='d-flex'>
          <ButtonLoading text={'Save'} isLoading={isLoading} isDisabled={isLoading} showModal={showModal}/>
          <button type='button' className='ms-2 btn btn-danger' onClick={showModal}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;