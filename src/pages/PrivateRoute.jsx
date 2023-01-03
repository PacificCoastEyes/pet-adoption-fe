import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, testingFor }) => {
    const { currentUser } = useContext(UserContext);

    switch (testingFor) {
        case "isLoggedIn":
            return Object.keys(currentUser).length ? (
                children
            ) : (
                <Navigate to="/" />
            );
        case "isNotLoggedIn":
            return Object.keys(currentUser).length ? (
                <Navigate to="/" />
            ) : (
                children
            );
        case "isAdmin":
            return currentUser.isAdmin === 1 ? children : <Navigate to="/" />;
        default:
            return <Navigate to="/" />;
    }
};

export default PrivateRoute;
