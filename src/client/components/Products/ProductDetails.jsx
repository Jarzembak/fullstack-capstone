import './style.css';
import SearchProducts from "../SearchProducts";
import { useNavigate, useParams } from "react-router-dom"
import { useGetProductQuery } from '../../services/products'
import { useCreateCartItemMutation, useDestroyCartItemMutation, useUpdateCartItemMutation } from '../../services/cart';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const ProductDetails = ({ setCart }) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { cart, cart: { cartId } } = useSelector(state => state.auth)
    const { data: product, isLoading } = useGetProductQuery(productId)

    const [addProductToCart] = useCreateCartItemMutation();
    const [updateCartItem] = useUpdateCartItemMutation();
    const [removeCartItem] = useDestroyCartItemMutation();

    const alreadyInCart = cart.cartItems.find(({ productId: productInCart }) => productInCart == productId)
    const [quantity, setQuantity] = useState(1);


    const handleQuantityChange = ({ target: { value } }) => {
        setQuantity(value)
    }

    const handleAddToCartButton = (evt) => {
        if (cartId) {
            addProductToCart({ ...product, quantity, cartId }).unwrap().then((success) => {
                let updatedCart = JSON.parse(JSON.stringify(cart));
                updatedCart.cartItems.push(success)
                setCart(updatedCart)
            }, (error) => {
                console.log("there was an error adding the item", error)
            })
        } else {
            navigate("/Login");
        }
    }

    const handleUpdateCartItem = async () => {
        let updatedCart = JSON.parse(JSON.stringify(cart));
        let updatedCartItem = (await updateCartItem({ ...product, quantity, cartId })).data
        updatedCart.cartItems = updatedCart.cartItems.map(item => item.productId == updatedCartItem.productId ? updatedCartItem : item)
        setCart(updatedCart)
    }

    const handleRemoveCartItem = () => {
        removeCartItem({ cartId, productId })
        let updatedCart = JSON.parse(JSON.stringify(cart));
        updatedCart.cartItems = cart.cartItems.filter(({ productId: productInCart }) => productInCart != productId)
        setCart(updatedCart)

    }
    if (isLoading) {

    } else {
        return (
            <>
                <SearchProducts />

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
                                <input type="number" className="productQuantity" min={1} max={999} name="quantity" onChange={handleQuantityChange} defaultValue={alreadyInCart ? alreadyInCart.quantity : 1} />
                                {alreadyInCart ?
                                    quantity != alreadyInCart.quantity ?
                                        <>
                                            <button className="button removeFromCart" onClick={handleRemoveCartItem}>Remove</button>
                                            <button className="button inCart" onClick={handleUpdateCartItem}>Update Cart</button>
                                        </>
                                        :
                                        <>
                                            <button className="button removeFromCart" onClick={handleRemoveCartItem}>Remove</button>
                                            <button className="button inCart" >In Cart </button>
                                        </>
                                    :
                                    <button className="button addToCart" onClick={handleAddToCartButton}>Add to cart</button>
                                }
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
