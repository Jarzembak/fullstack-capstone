
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Navigation from './components/Navigation'
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import Home from './components/Home';

function App() {
  return (
    <div className='App'>

      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Navigation />}>
          <Route index element={<Home />}/>
          <Route path="/Products" element={<Products />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
