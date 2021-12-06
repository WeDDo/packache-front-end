import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import ItemAdd from './components/ItemAdd';
import ItemUpdate from './components/ItemUpdate';

import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';
import OrderUpdate from './components/OrderUpdate';
import OrderAdd from './components/OrderAdd';

import PackageList from './components/PackageList';
import PackageDetail from './components/PackageDetail';
import PackageAdd from './components/PackageAdd';
import PackageUpdate from './components/PackageUpdate';

import Login from "./components/auth/Login";
import useToken from './components/app/useToken';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';

import Header from './components/app/Header';
import Footer from './components/app/Footer';
import UserInfo from './components/auth/UserInfo';

function App() {
  const { token, setToken } = useToken();
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Footer />
        <Routes>
          <Route path="/userinfo" element={< UserInfo />} />

          <Route path="/login" element={< Login setToken={setToken} />} />
          <Route path="/register" element={< Register />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/items" element={<ItemList />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/items/update/:id" element={<ItemUpdate />} />
          <Route path="/items/add" element={<ItemAdd />} />

          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/orders/update/:id" element={<OrderUpdate />} />
          <Route path="/orders/add" element={<OrderAdd />} />

          <Route path="/orders/:id/packages" element={<PackageList />} />
          <Route path="/orders/:orderId/packages/:id" element={<PackageDetail />} />
          <Route path="/orders/:orderId/packages/update/:id" element={<PackageUpdate />} />
          <Route path="/orders/:orderId/packages/add" element={<PackageAdd />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
