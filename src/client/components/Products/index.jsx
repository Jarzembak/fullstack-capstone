import './style.css';
import SearchProducts from "../SearchProducts";
import { useSearchProductsQuery } from '../../services/products'
import { useNavigate, useLocation, useParams, Link } from "react-router-dom"
import { useCreateCartItemMutation } from '../../services/cart';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Products = () => {
    const navigate = useNavigate();
    const searchParams = useLocation().state
    const { data, error, isLoading } = useSearchProductsQuery(!searchParams ? "nameContains=&pagination=50&goToPage=1&orderBy=price&orderDir=asc" : searchParams.searchParams)
    const [addProductToCart, { data: response, isLoading: addingProductToCart }] = useCreateCartItemMutation();
    const { cart: { cartItems } } = useSelector((state => state.auth));

    useEffect(() => {

    }, [searchParams])

    if (isLoading) {
        return (<><h1>Loading</h1></>)
    }

    const itemsInCart = cartItems.map(({ productId }) => productId);

    const renderProduct = ({ name, price, productId, imageUrl, category }) => {
        return <div className={`product ${itemsInCart.includes(productId) ? "inCart" : ""}`} key={productId} onClick={() => navigate(`/Products/${productId}`)}>
            <img src={imageUrl} alt={name}></img>
            <h5>{category}</h5>
            <h4>{name}</h4>
            <h3>${Number(price).toFixed(2)}</h3>
        </div>
    }

    const renderCategory = (category) => {
        return <Link to={{ pathname: "/Products" }} state={{ searchParams: `categoryContains=${category}&pagination=50&goToPage=1&orderBy=price&orderDir=asc` }} key={category} >{category}</Link>
    }

    const categories = data.map(({ category }) => category).filter((value, index, array) => {
        return array.indexOf(value) === index;
    }).sort()


    return (
        <>
            <SearchProducts categories={categories} />
            <div id='product_categories'>{categories.map(renderCategory)}</div>
            <div id="products_catalog">{data.map(renderProduct)}</div>
        </>
    );
};

export default Products;
