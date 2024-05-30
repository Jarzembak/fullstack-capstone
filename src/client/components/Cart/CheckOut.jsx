import './style.css';
import { useGetCurrentUserQuery, useGetUserCurrentCartQuery } from '../../services/user';
import { useUpdateCartStatusMutation } from '../../services/cart';
import { useNavigate } from 'react-router-dom';
const CheckOut = ({ setCart }) => {
    const navigate = useNavigate();
    const { data, isLoading: loadingUserData, error } = useGetCurrentUserQuery()
    const { data: currentCart, isLoading: fetchingCartId } = useGetUserCurrentCartQuery();
    const [updateCart, { data: updateCartResponse }] = useUpdateCartStatusMutation();

    if (loadingUserData || fetchingCartId) {
        return <>Loading</>
    }

    const handleCheckOut = async (evt) => {
        evt.preventDefault();
        console.log("currentcart", currentCart)
        if (confirm("Are you sure you are ready to submit this order?")) {
            updateCart({ cartId: currentCart.cartId, cartStatus: "Pending" }).unwrap().then(
                navigate("/OrderSubmitted")
            )
        }
    }



    const { firstName, lastName, email, streetAddress, city, zipcode, billingAddress, billingCity, billingZipcode, phone } = data

    return (
        <form onSubmit={handleCheckOut} method='PUT' >
            <div className='BasicInfo'>
                <label>First Name<input name='FName' defaultValue={firstName} /></label>
                <label>Last Name<input name='LName' defaultValue={lastName} /></label>
                <label>Email Name<input name='Email' defaultValue={email} /></label>
                <label>Phone Number<input name='Phone' defaultValue={phone} /></label>
            </div>

            <div className='address ShippingInfo'>
                <label>Address Line 1<input name='Shipping_Address1' defaultValue={streetAddress} /></label>
                <label>Address Line 2<input name='Shipping_Address2' /></label>
                <label>City<input name='Shipping_City' defaultValue={city} /></label>
                <label>State<input name='Shipping_State' /></label>
                <label>Zip Code<input name='Shipping_Zip' defaultValue={zipcode} /></label>
            </div>
            <input type="checkbox" />

            <div className='address BillingInfo'>
                <label>Address Line 1<input name='Billing_Address1' defaultValue={billingAddress} /></label>
                <label>Address Line 2<input name='Billing_Address2' /></label>
                <label>City<input name='Billing_City' defaultValue={billingCity} /></label>
                <label>State<input name='Billing_State' /></label>
                <label>Zip Code<input name='Billing_Zip' defaultValue={billingZipcode} /></label>
            </div>

            <div className='CreditCard'>
                <label>Credit Card Number<input name='CreditCard' /></label>
                <label>Expiry Month/Year<input name='CardExpiry' /></label>
                <label>CVV<input name='CVV' /></label>
            </div>

            <input className="button" type="submit" />
        </form>
    )
};

export default CheckOut;
