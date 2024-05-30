import { Outlet, Link, useParams } from "react-router-dom";
import './style.css';
import CartSummary from "../Cart/CartSummary";
import { useSelector } from "react-redux";

const Navigation = ({ setCart }) => {
    const { token, user: { isAdmin } } = useSelector(state => state.auth)

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                {token ?
                    isAdmin ? <>
                        <Link to="/Admin/Users">View All Users</Link>
                        <Link to="/Admin/Products">View All Products</Link>
                        <Link to="/Logout">Logout</Link>
                    </> : <>
                        <Link to="/Cart">View Cart: $<CartSummary setCart={setCart} /></Link>
                        <Link to="/OrderHistory">Order History</Link>
                        <Link to="/Logout">Logout</Link>
                    </> :
                    <>
                        <Link to="/Login">Login</Link>
                        <Link to="/Register">Register</Link>
                    </>
                }

            </nav>

            <div id="content">
                <Outlet />
            </div>
        </>
    );
};

export default Navigation;
