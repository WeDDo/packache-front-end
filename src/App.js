import react from 'react';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

import Item from './components/Item';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import ItemAdd from './components/ItemAdd';
import ItemUpdate from './components/ItemUpdate';

import Order from './components/Order'
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';
import OrderUpdate from './components/OrderUpdate';
import OrderAdd from './components/OrderAdd';

import PackageList from './components/PackageList';
import PackageDetail from './components/PackageDetail';

function App() {

  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
