interface ITransaction {
  id: string;
  type: string;
  category: string;
  amount: number;
  date: string;
}

interface ITransactionForm {
  type: string,
  category: string,
  amount: number,
  date: string,
}

export type ApiTransaction = Omit<ITransactionForm, 'id'>;

export interface TransactionList {
  [id: string]: ApiTransaction;
}