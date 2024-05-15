import './style.css';
import { useGetUserCurrentCartQuery } from '../../services/user';
import { useCreateCartMutation } from '../../services/cart';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CartSummary = ({ setCart }) => {
    const { cart, token } = useSelector((state => state.auth));
    const { data: userCart } = useGetUserCurrentCartQuery();
    const [createCart, { data: newCart, isUninitialized }] = useCreateCartMutation()

    const getCartTotal = ({ cartItems } = { cartItems: [] }) => {
        return <>{cartItems.reduce((cartTotal, { quantity, price }) => {
            return cartTotal += (price * quantity);
        }, 0)} | {cart.cartItems.reduce((sum, { quantity }) => quantity += sum, 0)} items</>
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
