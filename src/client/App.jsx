
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation, Login, Register, Products, ProductDetails, Home, Cart, Logout, ViewProducts, ViewUsers, CheckOut, OrderHistory, OrderSubmitted } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from './services/auth';

function App() {
  const { token, user: { isAdmin }, user } = useSelector(state => state.auth);
  const test = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const setCart = (cart) => dispatch(authSlice.actions.setCart(cart))
  const setToken = (token) => dispatch(authSlice.actions.setToken(token))


  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation setCart={setCart} />}>
            <>
              <Route index element={<Home />} />
              <Route path="*" element={<Navigate to={"/"} />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/Products/:productId" element={<ProductDetails setCart={setCart} />} />
            </>
            {token ? isAdmin ? <>
              <Route path="/Admin/Users" element={<ViewUsers />} />
              <Route path="/Admin/Products" element={<ViewProducts />} />
              <Route path="/Logout" element={<Logout />} />
            </> :
              <>
                <Route path="/Cart" element={<Cart />} />
                <Route path="/CheckOut" element={<CheckOut setCart={setCart} />} />
                <Route path="/OrderHistory" element={<OrderHistory />} />
                <Route path="/OrderSubmitted" element={<OrderSubmitted />} />
                <Route path="/Logout" element={<Logout />} />
              </>
              :
              <>
                <Route path="/Login" element={<Login setToken={setToken} />} />
                <Route path="/Register" element={<Register setToken={setToken} />} />
              </>
            }
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
