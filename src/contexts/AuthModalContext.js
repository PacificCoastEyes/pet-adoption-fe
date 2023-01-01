import { createContext } from "react";
import { useState } from "react";

export const AuthModalContext = createContext();

const AuthModalContextProvider = ({ children }) => {
    const initialStateSchemas = {
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

    const [loginFormData, setLoginFormData] = useState(initialStateSchemas.loginFormData);

    const [signupFormData, setSignupFormData] = useState(initialStateSchemas.signupFormData);

    const [isHiddenAlert, setIsHiddenAlert] = useState(initialStateSchemas.isHiddenAlert);
    
    const [msgAlertAuthError, setMsgAlertAuthError] = useState(initialStateSchemas.msgAlertAuthError);

    const stateSettersList = [setLoginFormData, setSignupFormData, setIsHiddenAlert, setMsgAlertAuthError]

    return (
        <AuthModalContext.Provider
            value={{
                initialStateSchemas,
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
