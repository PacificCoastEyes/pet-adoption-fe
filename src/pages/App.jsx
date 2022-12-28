import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";
import UserContextProvider from "../contexts/UserContext";
import AuthModalContextProvider from "../contexts/AuthModalContext";
import PageBasedFormContextProvider from "../contexts/PageBasedFormContext";
import Home from "./Home";
import Profile from "./Profile";
import AddPet from "./AddPet";
import PrivateRoute from "./PrivateRoute";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <UserContextProvider>
                    <AuthModalContextProvider>
                        <PageBasedFormContextProvider>
                            <Menu />
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Home title="The Pet Haven" />}
                                />
                                <Route
                                    path="/login"
                                    element={
                                        <PrivateRoute testingFor="isAlreadyLoggedIn">
                                            <Home
                                                title="Login | The Pet Haven"
                                                isAuthenticating
                                                isSigningUp={false}
                                            />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/signup"
                                    element={
                                        // <PrivateRoute testingFor="isAlreadyLoggedIn">
                                            <Home
                                                title="Sign Up | The Pet Haven"
                                                isAuthenticating
                                                isSigningUp={true}
                                            />
                                        // </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/logout"
                                    element={
                                        <PrivateRoute testingFor="isNotLoggedIn">
                                            <Home
                                                title="Logout | The Pet Haven"
                                                isLoggingOut
                                            />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <PrivateRoute testingFor="isNotLoggedIn">
                                            <Profile title="My Profile | The Pet Haven" />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/addpet"
                                    element={
                                        <PrivateRoute testingFor="isAdmin">
                                            <AddPet title="Add Pet | The Pet Haven" />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </PageBasedFormContextProvider>
                    </AuthModalContextProvider>
                </UserContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
