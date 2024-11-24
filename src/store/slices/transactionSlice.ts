import { createSlice } from '@reduxjs/toolkit';
import { ITransaction } from '../../types';
import { createTransaction } from '../thunks/transactionThunks';
import { RootState } from '../../app/store';

interface TransactionState {
  transactions: ITransaction[];
  loading: {
    isAdding: boolean,
  }
}

const initialState: TransactionState = {
  transactions: [],
  loading: {
    isAdding: false,
  }
};

export const selectAddTransactionLoading = (state: RootState) => state.transaction.loading.isAdding;

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading.isAdding = true;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.loading.isAdding = false;
      })
      .addCase(createTransaction.rejected, (state) => {
        state.loading.isAdding = false;
      });
  }
});

export const transactionReducer = transactionSlice.reducer;
export const {} = transactionSlice.actions;