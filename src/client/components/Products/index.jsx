import './style.css';
import SearchProducts from "../SearchProducts";

import { useGetProductsQuery } from '../../services/products'


import { useSearchParams, useNavigate } from "react-router-dom"
import { createElement, useEffect, useState } from 'react';
// import ProductDetails from './ProductDetails';
const Products = () => {
    const [query, setQuery] = useSearchParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // getProducts();
    }, [])

    const { data, error, isLoading } = useGetProductsQuery()


    if (isLoading) {
        console.log("we are loading")
    } else {
        console.log("the data is here", data)
    }


    const getProducts = async () => {
        try {
            const req = await fetch("/api/products");
            const res = await req.json();
            setProducts(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    const renderProducts = products.map(({ isVisible, name, price, productId, imageUrl }) => {
        return <div className="product" key={productId} onClick={() => navigate(`/Products/${productId}`)}>
            <img src={imageUrl} alt={name}></img>
            <h4>{name}</h4>
            <h3>${Number(price).toFixed(2)}</h3>
        </div>
    })

    const catalogNavi = <div className="catalog_navi">
        <button className="button prevPage">Previous Page</button>
        <button className='button nextPage'>Next Page</button>

    </div>

    return (
        <>
            <SearchProducts />
            Some Products with a name matching {query.get("q")}
            <div id="products_catalog">{products.length ? renderProducts : <>Nothing to show</>}</div>
            {catalogNavi}
        </>
    );
};

export default Products;
