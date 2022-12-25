import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";
import UserContextProvider from "../contexts/UserContext";
import AuthModalContextProvider from "../contexts/AuthModalContext";
import Home from "./Home";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <UserContextProvider>
                    <AuthModalContextProvider>
                        <Menu />
                        <Routes>
                            <Route path="/" element={<Home />} />

                            <Route
                                path="/login"
                                element={
                                    <Home
                                        isAuthenticating
                                        isSigningUp={false}
                                    />
                                }
                            />
                            <Route
                                path="/signup"
                                element={<Home isAuthenticating isSigningUp />}
                            />
                            <Route
                                path="/logout"
                                element={<Home isLoggingOut />}
                            />
                        </Routes>
                    </AuthModalContextProvider>
                </UserContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
