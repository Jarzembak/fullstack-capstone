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

    const handleHideOptions = (evt) => {
        document.getElementById("extraOptions").classList.toggle("showExtraOptions")
    }


    return (
        <>
            <form id="SearchProducts" onSubmit={handleSubmit} onReset={handleClearSearch} >
                <div>

                    <input id="nameContains" type="text" name="nameContains" autoComplete='off' placeholder='What are you looking for?' />
                    <div id="extraOptions">
                        <select name="categoryContains" defaultValue=""></select>

                        <div><label># of Items <input id="pagination" type="number" name="pagination" autoComplete='off' defaultValue="50" /></label></div>
                        <div><label>Go to Page #</label> <input id="goToPage" type="number" name="goToPage" autoComplete='off' defaultValue="1" /></div>

                        <select name="orderBy" defaultValue="price">
                            <option value="name">Order By: Name</option>
                            <option value="category">Order By: Category</option>
                            <option value="price">Order By: Price</option>
                        </select>

                        <select name="orderDir" defaultValue="asc">
                            <option value={"asc"}>Sort: Ascending</option>
                            <option value={"desc"}>Sort: Descending</option>
                        </select>
                    </div>
                </div>

                <input id="searchSubmitButton" name="searchSubmitButton" className='searchButton' type="submit" value="Go" />
                <input id="clearSearch" name="clearSearch" className='searchButton' type="reset" value="Clear" />
                <button id="hideExtraOptions" onClick={handleHideOptions}>Options</button>
            </form>
        </>
    );
};

export default SearchProducts;
