import { NavLink } from 'react-router-dom';
import './NavBar.css';
import Modal from '../UI/Modal/Modal';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAddTransactionLoading } from '../../store/slices/transactionSlice';
import { createTransaction, fetchAllTransactions } from '../../store/thunks/transactionThunks';
import { ApiTransaction } from '../../types';
import TransactionForm from '../TransactionForm/TransactionForm';

const NavBarAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const addLoading = useAppSelector(selectAddTransactionLoading);

  const addNewTransaction = async (transaction: ApiTransaction) => {
    await dispatch(createTransaction({...transaction}));
    await dispatch(fetchAllTransactions());
  };

  return (
    <div>
      <Modal show={showModal} closeModal={() => setShowModal(false)} defaultModalBtn={false}>
        <div className="modal-body">
          <div>
            <TransactionForm addNewTransaction={addNewTransaction} isLoading={addLoading} showModal={() => setShowModal(false)}/>
          </div>
        </div>
      </Modal>

      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <NavLink to="/" className="text-decoration-none"><span
            className="navbar-brand mb-0 text-white fs-1">Finance Tracker</span></NavLink>

          <div className="ms-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">Categories</NavLink>
              </li>
              <li className="nav-item">
                <button className='btn btn-link nav-link' onClick={() => setShowModal(true)}>Add</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBarAdmin;