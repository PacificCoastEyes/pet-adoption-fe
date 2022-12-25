import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { AuthModalContext } from "../contexts/AuthModalContext";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "../styles/AuthModal.css";

const AuthModal = ({ handleAuthModalClose }) => {
    const { isAuthenticating, isSigningUp, setIsLoggedIn, setCurrentUser } =
        useContext(UserContext);
    const {
        initialStatesList,
        stateSettersList,
        loginFormData,
        signupFormData,
        isHiddenAlert,
        setIsHiddenAlert,
        msgAlertAuthError,
        setMsgAlertAuthError,
    } = useContext(AuthModalContext);

    const areAllAlertsHidden =
        isHiddenAlert.signupSuccess &&
        Object.values(isHiddenAlert.authError).every(value => value === true);

    const navigate = useNavigate();

    const resetAuthModal = () => {
        for (let i = 0; i < stateSettersList.length; i++) {
            const setter = stateSettersList[i];
            const initialState = Object.values(initialStatesList)[i];
            setter(initialState);
        }
    };

    const handleSignup = () => {
        try {
            if (signupFormData.password !== signupFormData.confirmPassword)
                throw new Error("Passwords do not match");
            localStorage.setItem(
                signupFormData.email,
                JSON.stringify(signupFormData)
            );
            setIsHiddenAlert({
                signupSuccess: false,
                authError: { ...isHiddenAlert.authError, signup: true },
            });
            setTimeout(() => {
                navigate("/login");
                resetAuthModal();
            }, 3000);
        } catch (err) {
            setMsgAlertAuthError(err);
            setIsHiddenAlert({
                ...isHiddenAlert,
                authError: { ...isHiddenAlert.authError, signup: false },
            });
            console.log(err);
        }
    };

    const handleLogin = () => {
        try {
            const userIfExists = localStorage.getItem(loginFormData.email);
            if (!userIfExists)
                throw new Error(
                    "Email is not associated with an account. Please sign up."
                );
            const doesPasswordMatchStored =
                JSON.parse(userIfExists).password === loginFormData.password;
            if (!doesPasswordMatchStored)
                throw new Error("Password is incorrect");
            setIsHiddenAlert({
                ...isHiddenAlert,
                authError: { ...isHiddenAlert.authError, login: true },
            });
            setCurrentUser(JSON.parse(userIfExists));
            setIsLoggedIn(true);
            handleAuthModalClose();
            resetAuthModal();
        } catch (err) {
            setMsgAlertAuthError(err);
            setIsHiddenAlert({
                ...isHiddenAlert,
                authError: { ...isHiddenAlert.authError, login: false },
            });
            console.log(err);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (isSigningUp) {
            handleSignup();
            return;
        }
        handleLogin();
    };

    return (
        <Modal
            show={isAuthenticating}
            onHide={handleAuthModalClose}
            id="auth-modal"
        >
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
                    {isSigningUp ? <SignUpForm /> : <LoginForm />}
                </Modal.Body>
                <Modal.Footer
                    className={`d-flex justify-content-${
                        areAllAlertsHidden ? "end" : "between"
                    }`}
                >
                    {isSigningUp && (
                        <Alert
                            id="alert-signup-success"
                            variant="success"
                            className="px-2 py-1"
                            hidden={isHiddenAlert.signupSuccess}
                        >
                            Sign up successful! Taking you to login page...
                        </Alert>
                    )}
                    <Alert
                        id="alert-auth-error"
                        variant="danger"
                        className="px-2 py-1"
                        hidden={
                            isSigningUp
                                ? isHiddenAlert.authError.signup
                                : isHiddenAlert.authError.login
                        }
                    >{`Sorry, there was a problem ${
                        isSigningUp ? "signing you up" : "logging you in"
                    }. ${msgAlertAuthError}`}</Alert>
                    <Button type="submit">
                        {isSigningUp ? "Sign Up" : "Login"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AuthModal;