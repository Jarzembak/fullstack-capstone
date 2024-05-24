import { useGetUsersQuery } from '../../services/user';
import './style.css';
const ViewUsers = () => {
    const { data, isLoading, error } = useGetUsersQuery();

    if (isLoading) {
        console.log("loading all users")
    }

    if (error) {
        console.log("it errored here", error)
    }

    const renderUserHeaders = () => {
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

    const renderUser = ({ userId, createdAt, updatedAt, isAdmin, firstName, lastName, email }) => {
        return <div className="user" key={userId}>
            <span>{userId}</span>
            <span>{firstName}</span>
            <span>{lastName}</span>
            <span>{email}</span>
            <span>{new Date(createdAt).toLocaleString()}</span>
            <span>{new Date(updatedAt).toLocaleString()}</span>
            <span>{isAdmin ? "Yes" : ""}</span>
        </div>
    }


    return (
        <div id="users">
            {data && data.length ?
                <>
                    {renderUserHeaders()}
                    {data.map(renderUser)}
                </> : "There are no users to show"}
        </div>
    );
};

export default ViewUsers;
