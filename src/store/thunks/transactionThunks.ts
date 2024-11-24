import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiTransaction } from '../../types';
import axiosAPI from '../../axiosAPI';

export const createTransaction = createAsyncThunk<void, ApiTransaction>(
  'transaction/createTransaction',
  async (transaction) => {
    await axiosAPI.post('transactions.json', {...transaction});
  }
);