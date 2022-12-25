import { createContext } from "react";
import { useState } from "react";

export const AuthModalContext = createContext();

const AuthModalContextProvider = ({ children }) => {
    const initialStatesList = {
        loginFormData: {
            email: "",
            password: "",
        },

        signupFormData: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            isAdmin: false
        },

        isHiddenAlert: {
            signupSuccess: true,
            authError: {
                signup: true,
                login: true,
            },
        },
        msgAlertAuthError: "",
    };

    const [loginFormData, setLoginFormData] = useState(initialStatesList.loginFormData);

    const [signupFormData, setSignupFormData] = useState(initialStatesList.signupFormData);

    const [isHiddenAlert, setIsHiddenAlert] = useState(initialStatesList.isHiddenAlert);
    
    const [msgAlertAuthError, setMsgAlertAuthError] = useState(initialStatesList.msgAlertAuthError);

    const stateSettersList = [setLoginFormData, setSignupFormData, setIsHiddenAlert, setMsgAlertAuthError]

    return (
        <AuthModalContext.Provider
            value={{
                initialStatesList,
                stateSettersList,
                loginFormData,
                setLoginFormData,
                signupFormData,
                setSignupFormData,
                isHiddenAlert,
                setIsHiddenAlert,
                msgAlertAuthError,
                setMsgAlertAuthError,
            }}
        >
            {children}
        </AuthModalContext.Provider>
    );
};

export default AuthModalContextProvider;
