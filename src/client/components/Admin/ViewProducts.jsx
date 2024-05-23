import { useGetProductsQuery } from '../../services/products';
import { useGetUsersQuery } from '../../services/user';
import './style.css';
const ViewProducts = () => {
    const { data, isLoading, error } = useGetProductsQuery();

    if (isLoading) {
        console.log("loading all products")
    }

    if (error) {
        console.log("it errored here", error)
    }

    const renderProductHeaders = () => {
        return <div className="product header">
            <span>Product Id</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Initial Creation</span>
            <span>Last Modified</span>
            <span>Is Visible?</span>
        </div>
    }

    const renderProduct = ({ productId, createdAt, updatedAt, name, isVisible, imageUrl, description, category, price }) => {
        return <div key={productId} className='product'>
            <span>{productId}</span>
            <span>{name}</span>
            <span>{category}</span>
            <span>${price}</span>
            <span>{new Date(createdAt).toLocaleString()}</span>
            <span>{new Date(updatedAt).toLocaleString()}</span>
            <span>{isVisible}</span>
        </div>
    }


    return (
        <div id="products">
            {data && data.length ?
                <>
                    {renderProductHeaders()}
                    {data.map(renderProduct)}
                </> : "There are no users to show"}
        </div>
    );
};

export default ViewProducts;
