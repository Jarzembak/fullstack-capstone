import './style.css';
import SearchProducts from '../SearchProducts';
import { useSelector } from 'react-redux';
const Home = () => {
    const { token, user: { isAdmin } } = useSelector(state => state.auth)


    return (
        <>
            {isAdmin ?
                <>Admin View</>
                : <SearchProducts />

            }
        </>
    );
};

export default Home;
