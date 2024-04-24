import './style.css';
import { useSearchParams,useNavigate } from "react-router-dom"
const SearchProducts = ({submit:handleSubmit }) => {
    return (
        <>
            <form  id="SearchProducts"  onSubmit={handleSubmit}>
                <label >Search<input name="q" /><input type="submit" value="Go" /></label>
            </form>
        </>
    );
};

export default SearchProducts;
