import './style.css';
import SearchProducts from "../SearchProducts";
import { useSearchParams, useNavigate } from "react-router-dom"
import { createElement, useEffect, useState } from 'react';
// import ProductDetails from './ProductDetails';
const Products = () => {
    const [query, setQuery] = useSearchParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState();

    useEffect(() => {
        getProducts();
    }, [])

    console.log("Current Query", ...query)
    if (query.get("q").trim() == "") {
        navigate("/")
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        setQuery([...new FormData(evt.target)]);

    }

    const getProducts = async () => {
        try {
            const req = await fetch("/api/product");
            const res = await req.json();
            setProducts(res)
            console.log(products[0], products)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <SearchProducts submit={handleSubmit} />
            Some Products with a name matching {query.get("q")}
            {products.length ? products.reduce((arr, { isVisible, name, price, productId, imageUrl, description }) => {
                let product = createElement("div", {
                    key: productId, onClick: () => {
                        navigate(`/Products/${productId}`)
                    }
                }, [
                    <img src={imageUrl} alt={name}></img>,
                    <h4>{name}</h4>,
                    <p>{price}</p>
                ]);

                isVisible || true ? arr.push(product) : "";
                return arr;
            }, []) : "Nothing to show"}
        </>
    );
};

export default Products;
