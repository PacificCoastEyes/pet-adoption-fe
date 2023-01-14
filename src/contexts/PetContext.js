import { createContext, useState } from "react";

export const PetContext = createContext();

const PetContextProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState({});
    const [petDetails, setPetDetails] = useState({});
    const [savedPets, setSavedPets] = useState({});
    const [ownedPets, setOwnedPets] = useState({});
    const [petDetailsReferrer, setPetDetailsReferrer] = useState("");
    const [isViewingSavedPets, setIsViewingSavedPets] = useState(false);
    const [allPets, setAllPets] = useState([]);

    return (
        <PetContext.Provider
            value={{
                searchResults,
                setSearchResults,
                petDetails,
                setPetDetails,
                savedPets,
                setSavedPets,
                ownedPets,
                setOwnedPets,
                petDetailsReferrer,
                setPetDetailsReferrer,
                isViewingSavedPets,
                setIsViewingSavedPets,
                allPets,
                setAllPets,
            }}
        >
            {children}
        </PetContext.Provider>
    );
};

export default PetContextProvider;
