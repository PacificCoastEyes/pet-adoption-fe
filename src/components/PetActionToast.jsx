import { ToastContainer, Toast } from "react-bootstrap";

const PetActionToast = ({
    showPetActionToast,
    setShowPetActionToast,
    textPetActionToast,
}) => {
    return (
        <ToastContainer position="top-end" className="toast-container">
            <Toast
                show={showPetActionToast}
                onClose={() => setShowPetActionToast(false)}
                // delay={6000}
                // autohide
            >
                <Toast.Header>
                    <strong className="me-auto">The Pet Haven</strong>
                </Toast.Header>
                <Toast.Body>{textPetActionToast}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default PetActionToast;
