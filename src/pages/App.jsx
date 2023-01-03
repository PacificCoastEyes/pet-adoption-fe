import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";
import UserContextProvider from "../contexts/UserContext";
import AuthModalContextProvider from "../contexts/AuthModalContext";
import PageBasedFormContextProvider from "../contexts/PageBasedFormContext";
import Home from "./Home";
import Profile from "./Profile";
import AddPet from "./AddPet";
import Search from "./Search";
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
                                        <PrivateRoute testingFor="isNotLoggedIn">
                                            <Home
                                                title="Login | The Pet Haven"
                                                isAuthenticating={true}
                                                isSigningUp={false}
                                            />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/signup"
                                    element={
                                        <PrivateRoute testingFor="isNotLoggedIn">
                                            <Home
                                                title="Sign Up | The Pet Haven"
                                                isAuthenticating={true}
                                                isSigningUp={true}
                                            />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/logout"
                                    element={
                                        <PrivateRoute testingFor="isLoggedIn">
                                            <Home
                                                title="Logout | The Pet Haven"
                                                isLoggingOut={true}
                                            />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <PrivateRoute testingFor="isLoggedIn">
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
                                <Route
                                    path="/search"
                                    element={
                                        <Search title="Search Pets | The Pet Haven" />
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
