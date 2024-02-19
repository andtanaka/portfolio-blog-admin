import React from 'react';
import { Outlet } from 'react-router-dom';

import HeaderApp from './HeaderApp';
import SidebarMenu from './SidebarMenu';

const RootApp = () => {
  return (
    <>
      <HeaderApp />
      <main>
        <SidebarMenu />
        <Outlet />
      </main>
    </>
  );
};

export default RootApp;
