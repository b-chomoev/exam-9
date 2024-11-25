import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import CategoryPage from './containers/CategoryPage/CategoryPage';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:id' element={<Home />} />
          <Route path='/categories' element={<CategoryPage />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
