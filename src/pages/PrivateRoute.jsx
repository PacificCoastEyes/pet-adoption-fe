import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children, testingFor}) => {

    const {isLoggedIn, isAdmin} = useContext(UserContext);

    switch(testingFor) {
        case "isNotLoggedIn":
            return isLoggedIn ? children : <Navigate to="/" />;
        case "isAlreadyLoggedIn":
            return isLoggedIn ? <Navigate to="/" /> : children;
        case "isAdmin":
            return isAdmin ? children : <Navigate to="/" />;
        default:
            return <Navigate to="/" />;
    }
    
}

export default PrivateRoute;