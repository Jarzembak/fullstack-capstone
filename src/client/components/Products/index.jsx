import './style.css';
import SearchProducts from "../SearchProducts";
import { useSearchProductsQuery } from '../../services/products'
import { useNavigate, useLocation } from "react-router-dom"
import { useCreateCartItemMutation } from '../../services/cart';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Products = () => {
    const navigate = useNavigate();
    const prevSearchParams = useLocation().state
    const [searchParams, setSearchParams] = useState(!prevSearchParams ? "nameContains=&pagination=50&goToPage=1&orderBy=price&orderDir=asc" : prevSearchParams.searchParams);
    const { data, error, isLoading } = useSearchProductsQuery(searchParams)
    const [addProductToCart, { data: response, isLoading: addingProductToCart }] = useCreateCartItemMutation();
    const { cart: { cartItems } } = useSelector((state => state.auth));


    const handleNextPage = () => {
        setSearchParams(searchParams)
    }

    const itemsInCart = cartItems.map(({ productId }) => productId);

    if (isLoading) {
        return (<><h1>Loading</h1></>)
    } else {
        const catalogNavi = <div className="catalog_navi">
            <button className="button prevPage">Previous Page</button>
            <button className='button nextPage' onClick={handleNextPage}>Next Page</button>
        </div>

        return (
            <>
                <SearchProducts />
                <div id="products_catalog">{data.map(({ name, price, productId, imageUrl }) => {
                    return <div className={`product ${itemsInCart.includes(productId) ? "inCart" : ""}`} key={productId} onClick={() => navigate(`/Products/${productId}`)}>
                        <img src={imageUrl} alt={name}></img>
                        <h4>{name}</h4>
                        <h3>${Number(price).toFixed(2)}</h3>
                    </div>
                })}
                </div>
                {/* {catalogNavi} */}
            </>
        );
    }



};

export default Products;
