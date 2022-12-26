import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";
import UserContextProvider from "../contexts/UserContext";
import AuthModalContextProvider from "../contexts/AuthModalContext";
import Home from "./Home";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <UserContextProvider>
                    <AuthModalContextProvider>
                        <Menu />
                        <Routes>
                            <Route path="/" element={<Home title="The Pet Haven" />} />
                            <Route
                                path="/login"
                                element={
                                    <Home
                                        title="Login | The Pet Haven"
                                        isAuthenticating
                                        isSigningUp={false}
                                    />
                                }
                            />
                            <Route
                                path="/signup"
                                element={<Home title="Sign Up | The Pet Haven" isAuthenticating isSigningUp />}
                            />
                            <Route
                                path="/logout"
                                element={<Home title="Logout | The Pet Haven" isLoggingOut />}
                            />
                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute testingFor="isNotLoggedIn">
                                        <Profile title="My Profile | The Pet Haven" />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </AuthModalContextProvider>
                </UserContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
