import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Modal } from "react-bootstrap";

const LogoutModal = ({ handleLogoutModalClose }) => {
    const { isLoggingOut } = useContext(UserContext);

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
