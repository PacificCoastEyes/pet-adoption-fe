import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Hero from "../components/Hero";

const Home = ({ isAuthenticating, isSigningUp }) => {

    const {setIsAuthenticating, setIsSigningUp} = useContext(UserContext);

    useEffect(() => {
        if (isAuthenticating) setIsAuthenticating(true);
        setIsSigningUp(isSigningUp ? true : false);
    }, [isAuthenticating, setIsAuthenticating, isSigningUp, setIsSigningUp]);    

    return (
        <div id="home">
            <Hero />
        </div>
    )
}

export default Home;