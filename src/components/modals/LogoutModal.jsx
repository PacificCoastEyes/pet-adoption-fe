import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Modal } from "react-bootstrap";

const LogoutModal = ({ handleLogoutModalClose }) => {
    const { setIsLoggedIn, isLoggingOut, setCurrentUser } =
        useContext(UserContext);

    useEffect(() => {
        if (isLoggingOut) {
            /* eslint-enable */
            setIsLoggedIn(false);
            setCurrentUser({});
            /* eslint-disable */
        }
    }, [isLoggingOut]);

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
