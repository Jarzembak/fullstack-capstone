import './style.css';
import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom"

const SearchProducts = () => {

    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const params = createSearchParams([...new FormData(evt.target)]);
        if (!params.get("q").trim() == "") {
            navigate({
                pathname: "/Products",
                search: params.toString()
            });
        } else {
            navigate("/")
        }

    }
    return (
        <>
            <form id="SearchProducts" onSubmit={handleSubmit} >
                <input id="search" name="q" autoComplete='off' placeholder='What are you looking for?' />
                <input id="searchSubmitButton" type="submit" value="Go" />
            </form>
        </>
    );
};

export default SearchProducts;
