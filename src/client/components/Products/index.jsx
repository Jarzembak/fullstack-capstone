import './style.css';
import SearchProducts from "../SearchProducts";
import { useGetProductsQuery } from '../../services/products'
import { useSearchParams, useNavigate } from "react-router-dom"
import { useCreateCartItemMutation } from '../../services/cart';

const Products = () => {
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetProductsQuery()
    const [addProductToCart, { data: response, isLoading: addingProductToCart }] = useCreateCartItemMutation();

    if (isLoading) {
        return (<><h1>Loading</h1></>)
    } else {
        const catalogNavi = <div className="catalog_navi">
            <button className="button prevPage">Previous Page</button>
            <button className='button nextPage'>Next Page</button>
        </div>

        return (
            <>
                <SearchProducts />
                <div id="products_catalog">{data.map(({ isVisible, name, price, productId, imageUrl }) => {
                    return <div className="product" key={productId} onClick={() => navigate(`/Products/${productId}`)}>
                        <img src={imageUrl} alt={name}></img>
                        <h4>{name}</h4>
                        <h3>${Number(price).toFixed(2)}</h3>
                    </div>
                })}
                </div>
                {catalogNavi}
            </>
        );
    }



};

export default Products;
