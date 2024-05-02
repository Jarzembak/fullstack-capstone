import './style.css';
import SearchProducts from "../SearchProducts";
import { useSearchParams, useNavigate } from "react-router-dom"
import { createElement, useEffect, useState } from 'react';
// import ProductDetails from './ProductDetails';
const Products = () => {
    const [query, setQuery] = useSearchParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    if (query.get("q").trim() == "") {
        navigate("/")
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setQuery([...new FormData(evt.target)]);
    }

    const getProducts = async () => {
        try {
            const req = await fetch("/api/products");
            const res = await req.json();
            console.log(res)
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
            <p>{price}</p>
        </div>
    })

    const catalogNavi = <div className="catalog_navi">
        <button className="button prevPage">Previous Page</button>
        <button className='button nextPage'>Next Page</button>

    </div>

    return (
        <>
            <SearchProducts submit={handleSubmit} />
            Some Products with a name matching {query.get("q")}
            <div id="products_catalog">{products.length ? renderProducts : <>Nothing to show</>}</div>
            {catalogNavi}
        </>
    );
};

export default Products;
