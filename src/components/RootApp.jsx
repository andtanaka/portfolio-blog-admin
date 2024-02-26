import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import HeaderApp from './HeaderApp';
import SidebarMenu from './SidebarMenu';
import { useSelector } from 'react-redux';

const RootApp = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <>
      <HeaderApp />
      <main>
        <SidebarMenu />
        <Outlet />
      </main>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RootApp;
