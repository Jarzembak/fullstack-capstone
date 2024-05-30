import './style.css';
import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom"

const SearchProducts = () => {

    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const params = createSearchParams([...new FormData(evt.target)]);
        navigate({
            pathname: "/Products"
        }, { state: { searchParams: params.toString() } });
    }


    return (
        <>
            <form id="SearchProducts" onSubmit={handleSubmit} >
                <input id="nameContains" type="text" name="nameContains" autoComplete='off' placeholder='What are you looking for?' />
                <input id="pagination" type="hidden" name="pagination" autoComplete='off' defaultValue="50" />
                <input id="goToPage" type="hidden" name="goToPage" autoComplete='off' defaultValue="1" />
                <input id="orderBy" type="hidden" name="orderBy" autoComplete='off' defaultValue="price" />
                <input id="orderDir" type="hidden" name="orderDir" autoComplete='off' defaultValue="asc" />
                <input id="searchSubmitButton" type="submit" value="Go" />

            </form>
        </>
    );
};

export default SearchProducts;
