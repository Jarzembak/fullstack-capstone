import './style.css';
import { useGetUserCurrentCartQuery } from '../../services/user';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export function Cart() {
    const { cart } = useSelector(state => state.auth)
    const { data: currentCart, refetch } = useGetUserCurrentCartQuery();

    useEffect(() => {
        refetch()
    }, [cart])

    const renderCartItem = ({ productId, price, quantity, product }) => {
        const { imageUrl, name, price: currentPrice } = product
        return <div key={productId} className="cartItem">
            <div><img src={imageUrl} alt={name} /></div>
            <div className="itemDetails"><Link to={`/Products/${productId}`}>{name}</Link><span>${price}</span></div>
            <div><span>{quantity}</span></div>
            <div><span>${quantity * price}</span></div>
        </div>
    }


    return (<>
        <div id="cart">
            {currentCart ? currentCart.cartItems.map((item) => {
                return renderCartItem(item)
            }) : "Cart Main Page"}
        </div>
    </>
    )
};

export default Cart