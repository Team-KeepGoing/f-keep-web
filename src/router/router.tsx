import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '@/pages/main/Main';
import Inventory from '@/pages/inventory/Inventory';
import Uproad from '@/pages/uproad/Uproad';
import Login from '@/pages/login/Login';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/tools_list" element={<Inventory />} />
        <Route path="/uproad" element={<Uproad />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
