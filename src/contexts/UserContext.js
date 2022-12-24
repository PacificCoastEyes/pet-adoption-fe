import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserContext.Provider
            value={{
                isAuthenticating,
                setIsAuthenticating,
                isSigningUp,
                setIsSigningUp,
                isLoggedIn,
                setIsLoggedIn,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
