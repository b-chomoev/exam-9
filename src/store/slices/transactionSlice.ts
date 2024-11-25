import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiTransaction, ITransaction } from '../../types';
import {
  createTransaction,
  deleteTransaction, editTransaction,
  fetchAllTransactions,
  getOneTransaction
} from '../thunks/transactionThunks';
import { RootState } from '../../app/store';

interface TransactionState {
  transactions: ITransaction[];
  oneTransaction: ApiTransaction | null;
  loading: {
    isAdding: boolean,
    isFetching: boolean,
    isDeleting: boolean,
    isOneFetching: boolean,
    isEditing: boolean,
  }
}

const initialState: TransactionState = {
  transactions: [],
  oneTransaction: null,
  loading: {
    isAdding: false,
    isFetching: false,
    isDeleting: false,
    isOneFetching: false,
    isEditing: false,
  }
};

export const selectAddTransactionLoading = (state: RootState) => state.transaction.loading.isAdding;
export const selectAllTransactions = (state: RootState) => state.transaction.transactions;
export const selectFetchTransactionsLoading = (state: RootState) => state.transaction.loading.isFetching;
export const selectDeleteTransactionLoading = (state: RootState) => state.transaction.loading.isDeleting;
export const selectOneTransactionFetchLoading = (state: RootState) => state.transaction.loading.isOneFetching;
export const selectOneTransaction = (state: RootState) => state.transaction.oneTransaction;
export const selectEditTransactionLoading = (state: RootState) => state.transaction.loading.isEditing;

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
      })
      .addCase(getOneTransaction.pending, (state) => {
        state.loading.isOneFetching = true;
      })
      .addCase(getOneTransaction.fulfilled, (state, action: PayloadAction<ApiTransaction | null>) => {
        state.loading.isOneFetching = false;
        state.oneTransaction = action.payload;
      })
      .addCase(getOneTransaction.rejected, (state) => {
        state.loading.isOneFetching = false;
      })
      .addCase(editTransaction.pending, (state) => {
        state.loading.isEditing = true;
      })
      .addCase(editTransaction.fulfilled, (state) => {
        state.loading.isEditing = false;
        state.oneTransaction = null;
      })
      .addCase(editTransaction.rejected, (state) => {
        state.loading.isEditing = false;
      });
  }
});

export const transactionReducer = transactionSlice.reducer;
export const {} = transactionSlice.actions;