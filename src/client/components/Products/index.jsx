import './style.css';
import SearchProducts from "../SearchProducts";
import { useSearchParams, useNavigate } from "react-router-dom"
const Products = () => {
    const [query, setQuery] = useSearchParams();
    const navigate = useNavigate();

    console.log("Current Query", ...query)
    if (query.get("q").trim() == "") {
        navigate("/")
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        setQuery([...new FormData(evt.target)]);

    }

    return (
        <>
            <SearchProducts submit={handleSubmit} />
            Some Products with a name matching {query.get("q")}
            
        </>
    );
};

export default Products;
