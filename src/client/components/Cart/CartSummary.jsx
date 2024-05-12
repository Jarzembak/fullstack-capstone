import './style.css';
import { useGetUserCurrentCartQuery } from '../../services/user';
import { useCreateCartMutation } from '../../services/cart';
import { useEffect } from 'react';

const CartSummary = ({ cart, setCart }) => {

    const { data: gotCart, isSuccess } = useGetUserCurrentCartQuery();
    const [createCart, { data: newCart, isUninitialized }] = useCreateCartMutation()

    const getCartTotal = (cart) => {
        return <>{cart.cartItems.reduce((cartTotal, { quantity, price }) => {
            return cartTotal += (price * quantity);
        }, 0)}</>
    }

    useEffect(() => {
        if (isSuccess && isUninitialized && gotCart === null) {
            createCart()
        } else if (isSuccess) {
            setCart(gotCart)

        } else if (newCart) {
            setCart(newCart)
        }

    }, [cart, newCart, gotCart])

    return getCartTotal(cart)

};

export default CartSummary;
