import { createContext } from "react";
import { useState } from "react";

export const PageBasedFormContext = createContext(); 

const PageBasedFormContextProvider = ({children}) => {
    const [isHiddenAlert, setIsHiddenAlert] = useState(true);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    const resetAlert = () => {
        setIsHiddenAlert(true);
        setAlertVariant("");
        setAlertMsg("");
    };

    return (
        <PageBasedFormContext.Provider values={{
            isHiddenAlert,
            setIsHiddenAlert,
            alertVariant,
            setAlertVariant,
            alertMsg,
            setAlertMsg,
            resetAlert
        }}>
            {children}
        </PageBasedFormContext.Provider>
    )
}

export default PageBasedFormContextProvider;