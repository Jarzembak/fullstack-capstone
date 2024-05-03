import './style.css';
import SearchProducts from "../SearchProducts";
import { useSearchParams, useNavigate, useParams } from "react-router-dom"
import { createElement, useEffect, useState } from 'react';

const ProductDetails = () => {
    const [query, setQuery] = useSearchParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        getProduct();
    }, [])

    const handleSubmit = (evt) => {
        evt.preventDefault();

        setQuery([...new FormData(evt.target)]);

    }

    const getProduct = async () => {
        try {
            const req = await fetch(`/api/products/${productId}`);
            const res = await req.json();
            setProduct(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    const addToCart = () => {

    }



    return (
        <>
            <SearchProducts submit={handleSubmit} />
            Some Products with a name matching {query.get("q")}
            {product ? (({ name, price, productId, imageUrl, description }) => <>
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
            </>)(product)
                : ""}

        </>
    );
};

export default ProductDetails;
