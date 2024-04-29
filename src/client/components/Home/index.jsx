import './style.css';
import SearchProducts from '../SearchProducts';
import { useNavigate, createSearchParams } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const params = createSearchParams([...new FormData(evt.target)]);
        if (!params.get("q").trim() == "") {
            navigate({
                pathname: "/Products",
                search: params.toString()
            });
        }

    }
    return (
        <>
            <SearchProducts submit={handleSubmit} />
        </>
    );
};

export default Home;
