import { createContext } from "react";
import { useState } from "react";

export const PageBasedFormContext = createContext();

const PageBasedFormContextProvider = ({ children }) => {
    const [isHiddenAlert, setIsHiddenAlert] = useState({
        profileForm: true,
        addPetForm: true,
    });
    const [alertVariant, setAlertVariant] = useState({
        profileForm: "",
        addPetForm: "",
    });
    const [alertMsg, setAlertMsg] = useState({
        profileForm: "",
        addPetForm: "",
    });

    const resetAlertPageBasedForm = form => {
        setIsHiddenAlert({ ...isHiddenAlert, [form]: true });
        setAlertVariant({ ...alertVariant, [form]: "" });
        setAlertMsg({ ...alertMsg, [form]: "" });
    };

    return (
        <PageBasedFormContext.Provider
            value={{
                isHiddenAlert,
                setIsHiddenAlert,
                alertVariant,
                setAlertVariant,
                alertMsg,
                setAlertMsg,
                resetAlertPageBasedForm,
            }}
        >
            {children}
        </PageBasedFormContext.Provider>
    );
};

export default PageBasedFormContextProvider;
