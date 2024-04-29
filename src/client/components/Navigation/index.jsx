import { Outlet, Link, useParams } from "react-router-dom";
import './style.css';

const Navigation = () => {

    return (
        <>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
        </nav>
        <div id="content">
            <Outlet />
            
        </div>
        </>
    );
};

export default Navigation;
