import './style.css';
import SearchProducts from "../SearchProducts";
import { useSearchParams, useNavigate, useParams } from "react-router-dom"
import { useGetProductQuery } from '../../services/products'


const ProductDetails = () => {
    const [query, setQuery] = useSearchParams();
    const navigate = useNavigate();
    const { productId } = useParams();


    const { data, error, isLoading } = useGetProductQuery(productId)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setQuery([...new FormData(evt.target)]);
    }

    const addToCart = () => {

    }

    if (isLoading) {

    } else {

        return (
            <>
                <SearchProducts submit={handleSubmit} />
                Some Products with a name matching {query.get("q")}
                {(({ name, price, productId, imageUrl, description }) => <>
                    <div className='productDetails'>
                        <div className="productImage">
                            <img src={imageUrl} alt={name} />

                        </div>
                        <div className="details">
                            <h1 className='name'>{name}</h1>
                            <p className='description'>{description}</p>
                            <div className="price">
                                <span   >${Number(price).toFixed(2)}</span>
                                <button className="button addToCart" onClick={addToCart}>Add to cart</button>
                            </div>
                        </div>

                    </div>
                </>)(data)
                }

            </>
        );
    }






};

export default ProductDetails;
