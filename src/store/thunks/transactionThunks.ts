import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiTransaction, ITransaction, TransactionList } from '../../types';
import axiosAPI from '../../axiosAPI';

export const createTransaction = createAsyncThunk<void, ApiTransaction>(
  'transaction/createTransaction',
  async (transaction) => {
    await axiosAPI.post('transactions.json', {...transaction});
  }
);

export const fetchAllTransactions = createAsyncThunk<ITransaction[], void>(
  'transaction/fetchAllTransactions',
  async () => {
    const response: {data: TransactionList | null} = await axiosAPI.get('transactions.json');

    if (response.data) {
      const transactionsInObject = response.data;
      return Object.keys(transactionsInObject).map(id => {
        return {
          ...transactionsInObject[id],
          id: id,
        };
      });
    }

    return [];
  }
);

export const deleteTransaction = createAsyncThunk<void, string>(
  'transaction/deleteTransaction',
  async (id: string) => {
    await axiosAPI.delete(`transactions/${id}.json`);
  }
);

export const getOneTransaction = createAsyncThunk(
  'transaction/getOneTransaction',
  async (id: string) =>{
    const response = await axiosAPI.get<ITransaction | null>(`transactions/${id}.json`);

    if (!response.data) {
      return null;
    }

    return response.data;
  }
);

export const editTransaction = createAsyncThunk<void, {transactionId: string, transaction: ApiTransaction}>(
  'transaction/editTransaction',
  async ({transactionId, transaction}) => {
    await axiosAPI.put(`transactions/${transactionId}.json`, {...transaction});
  }
);