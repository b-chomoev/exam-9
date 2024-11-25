import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAllTransactions,
  selectDeleteTransactionLoading, selectEditTransactionLoading,
  selectFetchTransactionsLoading, selectOneTransaction, selectOneTransactionFetchLoading
} from '../../store/slices/transactionSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useCallback, useEffect, useState } from 'react';
import {
  deleteTransaction,
  editTransaction,
  fetchAllTransactions,
  getOneTransaction
} from '../../store/thunks/transactionThunks';
import dayjs from 'dayjs';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ApiTransaction } from '../../types';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import Modal from '../../components/UI/Modal/Modal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allTransactions = useAppSelector(selectAllTransactions);
  const fetchTransactions = useAppSelector(selectFetchTransactionsLoading);
  const deleteTransactionLoading = useAppSelector(selectDeleteTransactionLoading);
  const fetchOneTransactionLoading = useAppSelector(selectOneTransactionFetchLoading);
  const transaction = useAppSelector(selectOneTransaction);
  const selectEditLoading = useAppSelector(selectEditTransactionLoading);

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

  const getOneTransactionById = useCallback(async () => {
    if (id) {
      await dispatch(getOneTransaction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    void getOneTransactionById();
  }, [getOneTransactionById]);

  const edit = async (transaction: ApiTransaction) => {
    if (id) {
      await dispatch(editTransaction({transactionId: id, transaction}));
      setShowModal(false);
    }
    navigate('/');
    await fetchTransactionsFromServer();
  };

  return (
    <>
      {fetchTransactions || deleteTransactionLoading || fetchOneTransactionLoading ? <Spinner/> :
        <>
          <div>
            <div>
              {allTransactions.length === 0 ? <h3>No transactions yet</h3> :
                <>
                  <Modal show={showModal} closeModal={() => setShowModal(false)} defaultModalBtn={false}>
                    <div className="modal-body">
                      <div>
                        <TransactionForm addNewTransaction={edit} existingTransaction={transaction || undefined} isLoading={selectEditLoading} showModal={() => setShowModal(false)}/>
                      </div>
                    </div>
                  </Modal>

                  <h3>Total: {total}</h3>
                  {allTransactions.map(transaction => (
                    <div key={transaction.id} className="card mb-3 p-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <span>{dayjs(transaction.date).format('DD/MM/YYYY HH:mm:ss')}</span>
                          <strong className="ms-5 fs-4">{transaction.category}</strong>
                        </div>
                        <div>
                          <span
                            className="me-5 fs-5">{transaction.type === 'income' ? ('+ ' + transaction.amount) : ('- ' + transaction.amount)} KGS</span>
                          <button className="me-3 btn btn-danger" onClick={() => deleteTransactionById(transaction.id)}>Delete</button>
                          <NavLink to={`/${transaction.id}`} className="btn btn-primary ms-2" onClick={() => setShowModal(true)}>Edit</NavLink>
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