import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Button, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import AuthModal from "./AuthModal";
import LogoutModal from "./LogoutModal";
import { Search, PersonCircle, PlusLg, Speedometer2, BoxArrowInRight, BoxArrowLeft} from "react-bootstrap-icons";
import PawNav from "../icons/paw-nav";
import "../styles/Menu.css";

const Menu = () => {

    const {setIsAuthenticating, setIsLoggingOut, isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser} = useContext(UserContext);

    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)
    const toggleOffcanvas = () => {
      setIsOffcanvasOpen(!isOffcanvasOpen)
    }
  
    const handleOffcanvasClose = () => setIsOffcanvasOpen(false)

    const navigate = useNavigate();

    const handleAuthModalClose = () => {
        setIsAuthenticating(false);
        navigate("/");
    }

    const handleLogoutModalClose = () => {
        setIsLoggingOut(false);
        navigate("/");
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser({});
    };

    return (
        <>
            <Navbar
                id="menu"
                className="px-4"
                bg="primary"
                expand="md"
                sticky="top"
            >
                <Navbar.Brand>
                    <NavLink to="/">
                        <Logo />
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle onClick={toggleOffcanvas} />
                <Navbar.Offcanvas placement="end" className="offcanvas" show={isOffcanvasOpen} onHide={handleOffcanvasClose} restoreFocus={false}>
                    <Offcanvas.Header closeButton closeLabel="Close">
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1" onClick={handleOffcanvasClose}>
                            <NavLink to="/search">
                                <Button className="nav-item d-flex align-items-center"><Search className="me-2" />Search Pets</Button>
                            </NavLink>
                            {isLoggedIn && 
                                <NavLink to="/mypets" onClick={handleOffcanvasClose}>
                                    <Button className="nav-item d-flex align-items-center"><PawNav id="paw-nav" />My Pets</Button>
                                </NavLink>
                            }
                            {isLoggedIn && 
                                <NavLink to="/profile" onClick={handleOffcanvasClose}>
                                    <Button className="nav-item d-flex align-items-center"><PersonCircle className="me-2" />My Profile</Button>
                                </NavLink>
                            }
                            {(isLoggedIn && currentUser.isAdmin) &&
                                <NavLink to="/addpet" onClick={handleOffcanvasClose}>
                                    <Button className="nav-item d-flex align-items-center"><PlusLg className="me-2" />Add Pet</Button>
                                </NavLink>
                            }
                            {(isLoggedIn && currentUser.isAdmin) &&
                                <NavLink to="/dashboard" onClick={handleOffcanvasClose}>
                                    <Button className="nav-item d-flex align-items-center"><Speedometer2 className="me-2" />Dashboard</Button>
                                </NavLink>
                            }
                            <NavLink to={isLoggedIn ? "/logout" : "/login"} onClick={handleOffcanvasClose}>
                                <Button className="nav-item d-flex align-items-center" onClick={isLoggedIn ? handleLogout : undefined}>
                                    {isLoggedIn ? <BoxArrowLeft className="me-2" /> : <BoxArrowInRight className="me-2" /> }
                                    {isLoggedIn ? "Logout" : "Login"}
                                </Button>
                            </NavLink>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Navbar>
            <AuthModal
                handleAuthModalClose={handleAuthModalClose}
            />
            <LogoutModal handleLogoutModalClose={handleLogoutModalClose} />
        </>
    );
};

export default Menu;
