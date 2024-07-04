import './App.css';
import React from 'react';
import { Home } from './screen/Home';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Login } from './screen/Login.js';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { Signup } from './screen/Signup.js';
import { CartProvider } from './component/ContextReducer.js';
import { MyOrder } from './screen/MyOrder.js';
import NotFound from './screen/NotFound.js';
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />;
            <Route path='/login' element={<Login />} />;
            <Route path='/creatuser' element={<Signup />} />;
            <Route path='/myOrder' element={<MyOrder />} />;
            <Route path='*' element={<NotFound/>} />;
          </Routes>
        </div>

      </Router>
    </CartProvider>
  );
}

export default App;
