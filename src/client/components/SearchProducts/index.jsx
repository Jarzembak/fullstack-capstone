import './style.css';
import { useSearchParams, useNavigate,createSearchParams } from "react-router-dom"

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
            <form id="SearchProducts" onSubmit={handleSubmit}>
                <label >Search<input name="q" /><input type="submit" value="Go" /></label>
            </form>
        </>
    );
};

export default SearchProducts;
