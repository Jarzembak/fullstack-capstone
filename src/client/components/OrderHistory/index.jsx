import { useGetUserHistoryQuery } from '../../services/user';
import './style.css';


const OrderHistory = () => {

    const { data, isLoading, error } = useGetUserHistoryQuery()

    if (isLoading) {
        return <>Loading</>
    }

    const calculateOrderTotal = (items = []) => {
        return items.reduce((sum, { quantity, price }) => {
            sum += quantity * price;
            return sum;
        }, 0)
    }

    const calculateOrderItemCount = (items = []) => {
        return items.reduce((sum, { quantity }) => {
            sum += quantity;
            return sum;
        }, 0)
    }

    const renderOrder = ({ cartId, cartItems, cartStatus, createdAt, updatedAt }) => {
        return (<div key={cartId} className="order">
            <div>Order #{cartId}</div>
            <div>Items Purchased: {calculateOrderItemCount(cartItems)}</div>
            <div>Order Total ${calculateOrderTotal(cartItems)}</div>
            <div>Order Status: {cartStatus}</div>
            <div>Last Update: {new Date(updatedAt).toLocaleString().replace(",", "")}</div>
        </div>)
    }

    let nonCurrentCarts = data.filter(({ cartStatus }) => cartStatus != "current")

    return (
        <>
            {nonCurrentCarts.length ? nonCurrentCarts.sort(({ cartId: A }, { cartId: B }) => A > B).map(renderOrder) : "No Order History to Show"}
        </>
    );
};

export default OrderHistory;
