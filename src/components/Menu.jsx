import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Button, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import AuthModal from "./AuthModal";
import "../styles/Menu.css";

const Menu = () => {

    const {setIsAuthenticating, isLoggedIn} = useContext(UserContext);

    const navigate = useNavigate();

    const handleAuthModalShow = () => {
        setIsAuthenticating(true);
    }
    const handleAuthModalClose = () => {
        setIsAuthenticating(false);
        navigate("/");
    }

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
                            {/* <Link to={<Search />}> */}
                            <Button className="nav-item">Search Pets</Button>
                            {/* </Link> */}
                            {/* isLoggedIn && <Link to={<MyPets />}> */}
                            {/* <div className="nav-item">
                            My Pets
                        </div> */}
                            {/* </Link> */}
                            <Link to={isLoggedIn ? "/logout" : "/login"}>
                                <Button
                                    className="nav-item"
                                    onClick={handleAuthModalShow}
                                >
                                    {isLoggedIn ? "Logout" : "Login"}
                                </Button>
                            </Link>
                            {/* isLoggedIn && <Link to={<Profile />}> */}
                            {/* <div className="nav-item">
                            My Profile
                        </div> */}
                            {/* </Link> */}
                            {/* isLoggedIn && isAdmin && <Link to={<Dashboard />}> */}
                            {/* <div className="nav-item">
                            Admin Dashboard
                        </div> */}
                            {/* </Link> */}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Navbar>
            <AuthModal
                handleAuthModalClose={handleAuthModalClose}
            />
        </>
    );
};

export default Menu;
