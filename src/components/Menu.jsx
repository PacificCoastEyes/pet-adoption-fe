import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Button, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import AuthModal from "./AuthModal";
import LogoutModal from "./LogoutModal";
import { Search, PersonCircle, PlusLg, Speedometer2, BoxArrowInRight, BoxArrowLeft} from "react-bootstrap-icons";
import PawNav from "../icons/paw-nav";
import "../styles/Menu.css";

const Menu = () => {

    const {setIsAuthenticating, setIsLoggingOut, isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser} = useContext(UserContext);

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
                    <Link to="/">
                        <Logo />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Offcanvas placement="end" className="offcanvas">
                    <Offcanvas.Header closeButton closeLabel="Close">
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1">
                            <Link to="/search">
                                <Button className="nav-item d-flex align-items-center"><Search className="me-2" />Search Pets</Button>
                            </Link>
                            {isLoggedIn && 
                                <Link to="/mypets">
                                    <Button className="nav-item d-flex align-items-center"><PawNav id="paw-nav" />My Pets</Button>
                                </Link>
                            }
                            {isLoggedIn && 
                                <Link to="/profile">
                                    <Button className="nav-item d-flex align-items-center"><PersonCircle className="me-2" />My Profile</Button>
                                </Link>
                            }
                            {(isLoggedIn && currentUser.isAdmin) &&
                                <Link to="/addpet">
                                    <Button className="nav-item d-flex align-items-center"><PlusLg className="me-2" />Add Pet</Button>
                                </Link>
                            }
                            {(isLoggedIn && currentUser.isAdmin) &&
                                <Link to="/dashboard">
                                    <Button className="nav-item d-flex align-items-center"><Speedometer2 className="me-2" />Dashboard</Button>
                                </Link>
                            }
                            <Link to={isLoggedIn ? "/logout" : "/login"}>
                                <Button className="nav-item d-flex align-items-center" onClick={isLoggedIn ? handleLogout : undefined}>
                                    {isLoggedIn ? <BoxArrowLeft className="me-2" /> : <BoxArrowInRight className="me-2" /> }
                                    {isLoggedIn ? "Logout" : "Login"}
                                </Button>
                            </Link>
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
