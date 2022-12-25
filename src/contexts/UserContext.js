import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    return (
        <UserContext.Provider
            value={{
                isAuthenticating,
                setIsAuthenticating,
                isSigningUp,
                setIsSigningUp,
                isLoggedIn,
                setIsLoggedIn,
                isLoggingOut,
                setIsLoggingOut,
                currentUser,
                setCurrentUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
