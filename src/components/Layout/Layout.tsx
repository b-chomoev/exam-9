import NavBar from '../NavBar/NavBar';
import { PropsWithChildren } from 'react';
import * as React from 'react';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className='container mt-4'>
        {children}
      </main>
    </>
  );
};

export default Layout;