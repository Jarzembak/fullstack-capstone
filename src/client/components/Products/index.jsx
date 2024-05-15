import './style.css';
import SearchProducts from "../SearchProducts";
import { useGetProductsQuery } from '../../services/products'
import { useSearchParams, useNavigate } from "react-router-dom"
import { useCreateCartItemMutation } from '../../services/cart';
import { useState } from 'react';

const Products = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState([]);
    const { data, error, isLoading } = useGetProductsQuery()
    const [addProductToCart, { data: response, isLoading: addingProductToCart }] = useCreateCartItemMutation();

    const FilterProducts = ({ products = [] }) => {
        const keywords = products.reduce((arr, { name }) => {
            name.split(" ").forEach(key => {
                arr.includes(key) ? null : arr.push(key)
            })
            return arr
        }, [])

        const handleKeywordClick = (({ target: { innerText: value }, target: { classList }, target }) => {
            console.log(target, target.classList, filter, value);
            if (filter.includes(value)) {
                let newFilter = filter.filter(key => key != value)
                setFilter(newFilter)
                classList.remove("active")
            } else {
                let newFilter = [...filter, value]
                setFilter(newFilter)
                classList.add("active")
            }
        })

        return (
            <>
                <div id="filter">{keywords ? keywords.map((keyword) => {
                    return <span className="filterKeyword" key={keyword} onClick={handleKeywordClick}>{keyword}</span>
                }) : []}</div>
            </>
        );
    };



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
                <FilterProducts products={data} />
                <div id="products_catalog" className={filter.length ? "filtered" : ""}>{data.map((product) => {
                    let showProduct = product.name.split(" ").map(key => filter.includes(key)).includes(true);
                    return { ...product, showProduct }
                }).map(({ name, price, productId, imageUrl, showProduct }) => {
                    return <div className={`product ${showProduct ? "show" : "noshow"}`} key={productId} onClick={() => navigate(`/Products/${productId}`)}>
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
