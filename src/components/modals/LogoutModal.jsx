import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Modal } from "react-bootstrap";
import { instance } from "../../axiosInstance";

const LogoutModal = ({ handleLogoutModalClose }) => {
    const { setIsLoggedIn, isLoggingOut, setCurrentUser } =
        useContext(UserContext);

    useEffect(() => {
        if (isLoggingOut) {
            setIsLoggedIn(false);
            setCurrentUser({});
            const clearCookie = async () => {
                return await instance.get(
                    "https://thepethaven-be.azurewebsites.net/logout"
                );
            };
            clearCookie();
            localStorage.removeItem("currentUser");
        }
    }, [isLoggingOut, setCurrentUser, setIsLoggedIn]);

    return (
        <Modal
            show={isLoggingOut}
            onHide={handleLogoutModalClose}
            id="logout-modal"
        >
            <Modal.Header
                closeButton
                closeLabel="Close"
                className="align-items-start"
            >
                <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>You have been successfully logged out.</div>
            </Modal.Body>
        </Modal>
    );
};

export default LogoutModal;
