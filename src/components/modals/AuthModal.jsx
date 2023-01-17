import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AuthModalContext } from "../../contexts/AuthModalContext";
import {
    Alert,
    Button,
    Form,
    Modal,
    Toast,
    ToastContainer,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import SignUpForm from "../forms/SignUpForm";
import "../../styles/AuthModal.css";
import "../../styles/Toast.css";
import { instance } from "../../axiosInstance";

const AuthModal = ({ handleAuthModalClose }) => {
    const { isAuthenticating, isSigningUp, setIsLoggedIn, setCurrentUser } =
        useContext(UserContext);
    const {
        initialStateSchemas,
        stateSettersList,
        loginFormData,
        signupFormData,
        isHiddenAlert,
        setIsHiddenAlert,
        msgAlertAuthError,
        setMsgAlertAuthError,
    } = useContext(AuthModalContext);

    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [textSuccessToast, setTextSuccessToast] = useState("");

    const areAllAlertsHidden =
        isHiddenAlert.signupSuccess &&
        Object.values(isHiddenAlert.authError).every(value => value === true);

    const resetAuthModal = () => {
        for (let i = 0; i < stateSettersList.length; i++) {
            const setter = stateSettersList[i];
            const initialState = Object.values(initialStateSchemas)[i];
            setter(initialState);
        }
    };

    const handleSignup = async () => {
        try {
            const {
                firstName,
                lastName,
                email,
                phone,
                password,
                confirmPassword,
            } = signupFormData;
            const res = await instance.post(
                "https://thepethaven-be.azurewebsites.net/signup",
                {
                    firstName,
                    lastName,
                    email,
                    phone,
                    password,
                    confirmPassword,
                }
            );
            setCurrentUser({ ...res.data.user });
            setIsLoggedIn(true);
            localStorage.setItem(
                "currentUser",
                JSON.stringify({ ...res.data.user })
            );
            handleAuthModalClose();
            resetAuthModal();
            setShowSuccessToast(true);
            setTextSuccessToast(
                `Welcome to The Pet Haven, ${res.data.user.firstName}! We're so glad you signed up.`
            );
        } catch (err) {
            setMsgAlertAuthError(err.response.data);
            setIsHiddenAlert({
                ...isHiddenAlert,
                authError: { ...isHiddenAlert.authError, signup: false },
            });
        }
    };

    const handleLogin = async () => {
        try {
            const res = await instance.post(
                "https://thepethaven-be.azurewebsites.net/login",
                loginFormData
            );
            setIsHiddenAlert({
                ...isHiddenAlert,
                authError: { ...isHiddenAlert.authError, login: true },
            });
            setCurrentUser({ ...res.data.user });
            setIsLoggedIn(true);
            localStorage.setItem(
                "currentUser",
                JSON.stringify({ ...res.data.user })
            );
            handleAuthModalClose();
            resetAuthModal();
            setShowSuccessToast(true);
            setTextSuccessToast(
                `Welcome back to The Pet Haven, ${res.data.user.firstName}!`
            );
        } catch (err) {
            setMsgAlertAuthError(err.response.data.message);
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
        <>
            <Modal
                show={isAuthenticating}
                onHide={handleAuthModalClose}
                restoreFocus={false}
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
            <ToastContainer position="top-end" className="toast-container">
                <Toast
                    show={showSuccessToast}
                    onClose={() => setShowSuccessToast(false)}
                    delay={6000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">The Pet Haven</strong>
                    </Toast.Header>
                    <Toast.Body>{textSuccessToast}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default AuthModal;
