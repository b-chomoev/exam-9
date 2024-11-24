import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBarAdmin = () => {
  return (
    <>
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
                <button className='btn btn-link nav-link'>Add</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarAdmin;