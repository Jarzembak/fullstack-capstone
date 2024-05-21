import { Outlet, Link, useParams } from "react-router-dom";
import './style.css';
import CartSummary from "../Cart/CartSummary";
import { useSelector } from "react-redux";

const Navigation = ({ setCart }) => {
    const { token } = useSelector(state => state.auth)
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                {token ? <>
                    <Link to="/Cart">View Cart: $<CartSummary setCart={setCart} /></Link>
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
