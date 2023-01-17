import { createContext } from "react";
import { useEffect, useState } from "react";
import { instance } from "../axiosInstance";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("currentUser")) || {}
    );

    useEffect(() => {
        const fetchPrevUser = async () => {
            try {
                const res = await instance.get(
                    "https://thepethaven-be.azurewebsites.net/fetchPrevUser"
                );
                const { id, firstName, isAdmin } = res.data.user;
                setCurrentUser({ id, firstName, isAdmin });
                setIsLoggedIn(true);
            } catch (err) {
                return false;
            }
        };
        fetchPrevUser();
    }, []);

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
