import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import "../styles/Menu.css";

const Menu = () => {
    return (
        <Navbar id="menu" className="px-4" bg="primary" expand="md" sticky="top">
            <Navbar.Brand>
                <Link to="/">
                    <Logo />
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Offcanvas placement="end" className="offcanvas">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        {/* <Link to={<Search />}> */}
                        <div className="nav-item">
                            Search Pets
                        </div>
                        {/* </Link> */}
                        {/* isLoggedIn && <Link to={<MyPets />}> */}
                        {/* <div className="nav-item">
                            My Pets
                        </div> */}
                        {/* </Link> */}
                        {/* isLoggedIn ? <Link to={<Logout />}> : <Link to={<Login />}> */}
                        <div className="nav-item">
                            Login
                        </div>
                        {/* </Link> */}
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
    );
};

export default Menu;
