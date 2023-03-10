import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";
import UserContextProvider from "../contexts/UserContext";
import PetContextProvider from "../contexts/PetContext";
import SearchContextProvider from "../contexts/SearchContext";
import AuthModalContextProvider from "../contexts/AuthModalContext";
import PageBasedFormContextProvider from "../contexts/PageBasedFormContext";
import Home from "./Home";
import Profile from "./Profile";
import AddPet from "./AddPet";
import Search from "./Search";
import Pet from "./Pet";
import PrivateRoute from "./PrivateRoute";
import MyPets from "./MyPets";
import Dashboard from "./Dashboard";
import User from "./User";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <UserContextProvider>
                    <PetContextProvider>
                        <SearchContextProvider>
                            <AuthModalContextProvider>
                                <PageBasedFormContextProvider>
                                    <Menu />
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={
                                                <Home title="The Pet Haven" />
                                            }
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
                                            path="/editpet"
                                            element={
                                                <PrivateRoute testingFor="isAdmin">
                                                    <AddPet
                                                        title="Edit Pet | The Pet Haven"
                                                        isEditing
                                                    />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/dashboard"
                                            element={
                                                <PrivateRoute testingFor="isAdmin">
                                                    <Dashboard title="Dashboard | The Pet Haven" />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/search"
                                            element={
                                                <Search title="Search Pets | The Pet Haven" />
                                            }
                                        />
                                        <Route
                                            path="/mypets"
                                            element={
                                                <PrivateRoute testingFor="isLoggedIn">
                                                    <MyPets title="My Pets | The Pet Haven" />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/pet"
                                            element={
                                                <Pet title="Pet Details | The Pet Haven" />
                                            }
                                        />
                                        <Route
                                            path="/user"
                                            element={
                                                <PrivateRoute testingFor="isAdmin">
                                                    <User title="User Details | The Pet Haven" />
                                                </PrivateRoute>
                                            }
                                        />
                                    </Routes>
                                </PageBasedFormContextProvider>
                            </AuthModalContextProvider>
                        </SearchContextProvider>
                    </PetContextProvider>
                </UserContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
