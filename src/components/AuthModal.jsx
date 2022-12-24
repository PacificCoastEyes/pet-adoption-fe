import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "../styles/AuthModal.css";

const AuthModal = ({ handleAuthModalClose }) => {
    const { isAuthenticating, isSigningUp } = useContext(UserContext);

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });
    const [signupFormData, setSignupFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <Modal show={isAuthenticating} onHide={handleAuthModalClose} id="modal">
            <Modal.Header
                closeButton
                closeLabel="Close"
                className="align-items-start"
            >
                <Modal.Title className="d-flex flex-column">
                    {isSigningUp ? "Sign Up" : "Login"}
                    <h6 className="mt-2 fw-normal">
                        {isSigningUp
                            ? "Already a member?"
                            : "New to The Pet Haven?"}
                        <Link
                            to={isSigningUp ? "/login" : "/signup"}
                            className="ms-2"
                        >
                            {isSigningUp ? "Login" : "Sign Up"}
                        </Link>
                    </h6>
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {isSigningUp ? (
                        <SignUpForm
                            signupFormData={signupFormData}
                            setSignupFormData={setSignupFormData}
                        />
                    ) : (
                        <LoginForm
                            loginFormData={loginFormData}
                            setLoginFormData={setLoginFormData}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">
                        {isSigningUp ? "Sign Up" : "Login"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AuthModal;
