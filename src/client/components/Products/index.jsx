import './style.css';
import SearchProducts from "../SearchProducts";
import { useGetProductsQuery, useSearchProductsQuery } from '../../services/products'
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { useCreateCartItemMutation } from '../../services/cart';
import { useState } from 'react';

const Products = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState(useLocation().state.searchParams);
    const { data, error, isLoading } = useSearchProductsQuery(searchParams)
    const [addProductToCart, { data: response, isLoading: addingProductToCart }] = useCreateCartItemMutation();

    const handleNextPage = () => {
        console.log(searchParams)

        setSearchParams(searchParams)
    }

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
