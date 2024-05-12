import './style.css';
import { useGetUserCurrentCartQuery } from '../../services/user';

export function Cart() {
    const { data: currentUserCart, isLoading: currentUserCartLoading, error: currentUserCartError } = useGetUserCurrentCartQuery();
    const renderCartItem = ({ productId, price, quantity, product }) => {
        const { imageUrl, name, price: currentPrice } = product
        return <div key={productId}>
            <div><img src={imageUrl} alt={name} /></div>
            <div><span>{name}</span></div>
            <div><span>{quantity}</span></div>
        </div>
    }

    if (currentUserCartLoading) {

    } else {
        return (<>
            <div>
                {currentUserCart.cartItems ? currentUserCart.cartItems.map((item) => {
                    return renderCartItem(item)
                }) : "Cart Main Page"}
            </div>
        </>
        )
    }
};

export default Cart