import React from 'react';
import { Outlet } from 'react-router-dom';

import HeaderApp from './HeaderApp';

const RootLayout = () => {
  return (
    <>
      <HeaderApp />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
