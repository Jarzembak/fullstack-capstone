import { useNavigate } from 'react-router-dom';
import './style.css';

const OrderSubmited = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        window.location.href = "/"
    }, 5000);

    return (
        <>
            Thank you for placing your order
        </>
    );
};

export default OrderSubmited;
