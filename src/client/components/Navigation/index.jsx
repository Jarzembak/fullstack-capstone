import { Outlet, Link, useParams } from "react-router-dom";
import './style.css';
import CartSummary from "../Cart/CartSummary";

const Navigation = () => {

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
            </nav>
            <CartSummary />
            <div id="content">
                <Outlet />

            </div>
        </>
    );
};

export default Navigation;
