import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITransaction } from '../../types';
import { createTransaction, deleteTransaction, fetchAllTransactions } from '../thunks/transactionThunks';
import { RootState } from '../../app/store';

interface TransactionState {
  transactions: ITransaction[];
  loading: {
    isAdding: boolean,
    isFetching: boolean,
    isDeleting: boolean,
  }
}

const initialState: TransactionState = {
  transactions: [],
  loading: {
    isAdding: false,
    isFetching: false,
    isDeleting: false,
  }
};

export const selectAddTransactionLoading = (state: RootState) => state.transaction.loading.isAdding;
export const selectAllTransactions = (state: RootState) => state.transaction.transactions;
export const selectFetchTransactionsLoading = (state: RootState) => state.transaction.loading.isFetching;
export const selectDeleteTransactionLoading = (state: RootState) => state.transaction.loading.isDeleting;

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
      })
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading.isFetching = true;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action: PayloadAction<ITransaction[]>) => {
        state.loading.isFetching = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state) => {
        state.loading.isFetching = false;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loading.isDeleting = true;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.loading.isDeleting = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.loading.isDeleting = false;
      });
  }
});

export const transactionReducer = transactionSlice.reducer;
export const {} = transactionSlice.actions;