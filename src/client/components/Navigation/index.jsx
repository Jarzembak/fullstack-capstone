import { Outlet, Link, useParams } from "react-router-dom";
import './style.css';
import CartSummary from "../Cart/CartSummary";

const Navigation = ({ setCart, token, cart }) => {

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                {token ? <>
                    <CartSummary cart={cart} setCart={setCart} />
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
