interface ITransaction {
  id: string;
  type: string;
  category: string;
  amount: number;
}

interface ITransactionForm {
  type: string,
  category: string,
  amount: number,
}

export type ApiTransaction = Omit<ITransactionForm, 'id'>;