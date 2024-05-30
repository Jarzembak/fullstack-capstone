import './style.css';
import { useGetUserCurrentCartDetailsQuery } from '../../services/user';
import { useCreateCartMutation } from '../../services/cart';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CartSummary = ({ setCart }) => {
    const { cart, token } = useSelector((state => state.auth));
    const { data: userCart } = useGetUserCurrentCartDetailsQuery();
    const [createCart, { data: newCart, isUninitialized }] = useCreateCartMutation()

    const getCartTotal = ({ cartItems } = { cartItems: [] }) => {

        return <><span className={cartItems.length ? "" : "noShow"}>View Cart: ${cartItems.reduce((cartTotal, { quantity, price }) => {
            return cartTotal += (price * quantity);
        }, 0)} | {cart.cartItems.reduce((sum, { quantity }) => quantity += sum, 0)} items</span></>
    }

    useEffect(() => {
        if (isUninitialized && userCart === null) {
            createCart()
        } else if (userCart || newCart) {
            setCart(userCart || { ...newCart, cartItems: [] })
        }
    }, [userCart, newCart])

    return getCartTotal(cart)

};

export default CartSummary;
