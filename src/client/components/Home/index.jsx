import './style.css';
import SearchProducts from '../SearchProducts';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Home = () => {
    const { token, user: { isAdmin } } = useSelector(state => state.auth)


    return (
        <>
            {isAdmin ?
                <div id="adminButtons">
                    <Link to="/Admin/Users">View All Users</Link>
                    <Link to="/Admin/Products">View All Products</Link>
                </div>
                : <SearchProducts />

            }
        </>
    );
};

export default Home;
