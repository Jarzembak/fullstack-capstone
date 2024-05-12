import './style.css';
import SearchProducts from "../SearchProducts";
import { useSearchParams, useParams } from "react-router-dom"
import { useGetProductQuery } from '../../services/products'
import { useCreateCartItemMutation } from '../../services/cart';
import { useSelector } from 'react-redux';


const ProductDetails = ({ cart, setCart }) => {
    const [query, setQuery] = useSearchParams();
    const { productId } = useParams();


    const { data: product, error, isLoading } = useGetProductQuery(productId)
    const [addProductToCart] = useCreateCartItemMutation();

    const handleAddToCartButton = (evt) => {
        addProductToCart({ ...product, quantity: 1, cartId: cart.cartId }).unwrap().then((success) => {
            console.log("adding item to cart")
            let updatedCart = JSON.parse(JSON.stringify(cart));
            updatedCart.cartItems.push(success)
            setCart(updatedCart)
        }, (error) => {
            console.log("there was an error addign the item", error)
        })

    }
    if (isLoading) {

    } else {

        return (
            <>
                <SearchProducts />
                Some Products with a name matching {query.get("q")}
                {(({ name, price, productId, imageUrl, description }) => <>
                    <div className='productDetails'>
                        <div className="productImage">
                            <img src={imageUrl} alt={name} />

                        </div>
                        <div className="details">
                            <h1 className='name'>{name}</h1>
                            <p className='description'>{description}</p>
                            <div className="price">
                                <span   >${Number(price).toFixed(2)}</span>
                                <button className="button addToCart" onClick={handleAddToCartButton}>Add to cart</button>
                            </div>
                        </div>

                    </div>
                </>)(product)
                }
            </>
        );
    }






};

export default ProductDetails;
