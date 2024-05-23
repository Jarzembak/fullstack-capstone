import { useGetProductsQuery } from '../../services/products';
import { useGetUsersQuery } from '../../services/user';
import './style.css';
const ViewProducts = () => {
    const { data, isLoading, error } = useGetProductsQuery();

    if (isLoading) {
        console.log("loading all users")
    }

    if (error) {
        console.log("it errored here", error)
    }

    const renderProductHeaders = () => {
        return <div className="user header">
            <span>User Id</span>
            <span>First Name</span>
            <span>Last Name</span>
            <span>Email</span>
            <span>Initial Creation</span>
            <span>Last Modified</span>
            <span>Is Admin?</span>
        </div>
    }

    const renderProduct = (product) => {
        console.log(product)
        return <></>
    }


    return (
        <div id="users">
            {data && data.length ?
                <>
                    {/* {renderUserHeaders()} */}
                    {data.map(renderProduct)}
                </> : "There are no users to show"}
        </div>
    );
};

export default ViewProducts;
