import './style.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Products from '../Products';
const Home = () => {
    const { token, user: { isAdmin } } = useSelector(state => state.auth)


    return (
        <>
            {isAdmin ?
                <div id="adminButtons">
                    <Link to="/Admin/Users">View All Users</Link>
                    <Link to="/Admin/Products">View All Products</Link>
                </div>
                : <Products />
            }
        </>
    );
};

export default Home;
