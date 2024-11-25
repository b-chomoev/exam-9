import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAllTransactions,
  selectDeleteTransactionLoading,
  selectFetchTransactionsLoading
} from '../../store/slices/transactionSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useCallback, useEffect } from 'react';
import { deleteTransaction, fetchAllTransactions } from '../../store/thunks/transactionThunks';
import dayjs from 'dayjs';

const Home = () => {
  const dispatch = useAppDispatch();
  const allTransactions = useAppSelector(selectAllTransactions);
  const fetchTransactions = useAppSelector(selectFetchTransactionsLoading);
  const deleteTransactionLoading = useAppSelector(selectDeleteTransactionLoading);

  const total = allTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      return acc + transaction.amount;
    } else {
      return acc - transaction.amount;
    }
  }, 0);

  const fetchTransactionsFromServer = useCallback(async () => {
    await dispatch(fetchAllTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === '/') {
      void fetchTransactionsFromServer();
    }
  }, [fetchTransactionsFromServer]);

  const deleteTransactionById = async (id: string) => {
    if (id) {
      await dispatch(deleteTransaction(id));
    }
    await fetchTransactionsFromServer();
  };

  return (
    <>
      {fetchTransactions || deleteTransactionLoading ? <Spinner/> :
        <>
          <div>
            <div>
              {allTransactions.length === 0 ? <h3>No transactions yet</h3> :
                <>
                  <h3>Total: {total}</h3>
                  {allTransactions.map(transaction => (
                    <div className="card mb-3 p-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <span>{dayjs(transaction.date).format('DD/MM/YYYY HH:mm:ss')}</span>
                          <strong className="ms-5 fs-4">{transaction.category}</strong>
                        </div>
                        <div>
                          <span
                            className="me-5 fs-5">{transaction.type === 'income' ? ('+ ' + transaction.amount) : ('- ' + transaction.amount)} KGS</span>
                          <button className="me-3 btn btn-danger" onClick={() => deleteTransactionById(transaction.id)}>Delete</button>
                          <button className="btn btn-primary">Edit</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              }
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Home;