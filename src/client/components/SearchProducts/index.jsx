import './style.css';
import { useNavigate, createSearchParams } from "react-router-dom"

const SearchProducts = () => {

    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const params = createSearchParams([...new FormData(evt.target)]);
        navigate({ pathname: `/Products` }, { state: { searchParams: params.toString() } });
    }

    const handleClearSearch = () => {
        navigate({
            pathname: `/Products`
        }, { state: { searchParams: "nameContains=&pagination=50&goToPage=1&orderBy=price&orderDir=asc" } });
    }

    return (
        <>
            <form id="SearchProducts" onSubmit={handleSubmit} onReset={handleClearSearch} >
                <input id="nameContains" type="text" name="nameContains" autoComplete='off' placeholder='What are you looking for?' />
                <input id="pagination" type="hidden" name="pagination" autoComplete='off' defaultValue="50" />
                <input id="goToPage" type="hidden" name="goToPage" autoComplete='off' defaultValue="1" />
                <input id="orderBy" type="hidden" name="orderBy" autoComplete='off' defaultValue="price" />
                <input id="orderDir" type="hidden" name="orderDir" autoComplete='off' defaultValue="asc" />
                <input id="searchSubmitButton" name="searchSubmitButton" className='searchButton' type="submit" value="Go" />
                <input id="clearSearch" name="clearSearch" className='searchButton' type="reset" value="Clear" />
            </form>
        </>
    );
};

export default SearchProducts;
