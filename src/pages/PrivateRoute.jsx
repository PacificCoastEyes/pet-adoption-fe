import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children, testingFor}) => {

    const {isLoggedIn, currentUser} = useContext(UserContext);

    switch(testingFor) {
        case "isLoggedIn":
            return isLoggedIn ? children : <Navigate to="/" />;
        case "isNotLoggedIn":
            return isLoggedIn ? <Navigate to="/" /> : children;
        case "isAdmin":
            return currentUser.isAdmin ? children : <Navigate to="/" />;
        default:
            return <Navigate to="/" />;
    }
    
}

export default PrivateRoute;