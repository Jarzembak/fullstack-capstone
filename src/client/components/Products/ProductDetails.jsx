import './style.css';
import SearchProducts from "../SearchProducts";
import { useSearchParams, useNavigate,useParams } from "react-router-dom"
import { createElement, useEffect, useState } from 'react';

const ProductDetails = () => {
    const [query, setQuery] = useSearchParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const {productId} = useParams();

    useEffect(() => {
        getProduct();
    }, [])

    console.log("Current Query", ...query)
    // if (query.get("q").trim() == "") {
    //     navigate("/")
    // }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        setQuery([...new FormData(evt.target)]);

    }

    const getProduct = async () => {
        console.log("getting Product",productId)
        try {
            const req = await fetch(`/api/product/${productId}`);
            const res = await req.json();
            setProduct(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <SearchProducts submit={handleSubmit} />
            Some Products with a name matching {query.get("q")}
            {product ? (({isVisible,name,price,productId,imageUrl,description})=>{
                let product = createElement("div",{key:productId},[
                    <img src={imageUrl} alt={name}></img>,
                    <h4>{name}</h4>,
                    <p>{price}</p>
                ]);
                return product
            })(product)
            
               

            :""}

           
        </>
    );
};

export default ProductDetails;
