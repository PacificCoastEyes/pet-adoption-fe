import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Hero from "../components/Hero";

const Home = ({ isAuthenticating, isSigningUp, isLoggingOut }) => {

    const {setIsAuthenticating, setIsSigningUp, setIsLoggingOut} = useContext(UserContext);

    useEffect(() => {
        if (isLoggingOut) setIsLoggingOut(true);
        if (isAuthenticating) setIsAuthenticating(true);
        setIsSigningUp(isSigningUp ? true : false);
    }, [isAuthenticating, setIsAuthenticating, isSigningUp, setIsSigningUp, isLoggingOut, setIsLoggingOut]);    

    return (
        <div id="home">
            <Hero />
        </div>
    )
}

export default Home;