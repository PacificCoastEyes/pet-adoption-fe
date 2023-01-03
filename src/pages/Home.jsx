import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Hero from "../components/Hero";

const Home = ({ title, isAuthenticating, isSigningUp, isLoggingOut }) => {
    const { setIsAuthenticating, setIsSigningUp, setIsLoggingOut } =
        useContext(UserContext);
    useEffect(() => {
        document.title = title;
        if (isLoggingOut) setIsLoggingOut(true);
        if (isAuthenticating) setIsAuthenticating(true);
        setIsSigningUp(isSigningUp ? true : false);
    }, [
        isAuthenticating,
        isLoggingOut,
        isSigningUp,
        setIsAuthenticating,
        setIsLoggingOut,
        setIsSigningUp,
        title,
    ]);

    return (
        <div id="home">
            <Hero />
        </div>
    );
};

export default Home;
