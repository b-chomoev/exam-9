import React, { useState } from 'react';

const initialState = {
  type: '',
  category: '',
  amount: 0,
};

const TransactionForm = () => {
  const [value, setValue] = useState<ITransactionForm>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setValue(prevState => {
      return {
        ...prevState,
        amount: Number(value.amount),
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(value);
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
            onChange={handleChange}
            value={value.type}
          >
            <option selected>Choose type of your transaction</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </select>
        </div>

        <div className='form-group mb-2'>
          <label htmlFor="category">Category</label>
          {value.type === 'income' ? (
            <select
              className="form-select"
              aria-label="Default select example"
              name='category'
              onChange={handleChange}
              value={value.category}
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
              onChange={handleChange}
              value={value.category}
            >
              <option selected>Choose type of expenses transaction</option>
              <option value="food">Food</option>
              <option value="rent">Rent</option>
              <option value="education">Education</option>
            </select>
          )}
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id='amount'
            name='amount'
            onChange={handleChange}
            value={value.amount}
            className='form-control'
            required
          />
        </div>

        <button className='btn btn-primary mt-2'>Save</button>
      </form>
    </div>
  );
};

export default TransactionForm;