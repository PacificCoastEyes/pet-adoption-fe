import { createContext, useState } from "react";

export const PetContext = createContext();

const PetContextProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState({});
    const [petDetails, setPetDetails] = useState({});
    // const [likedPets, setLikedPets] = useState({});
    // const [ownedPets, setOwnedPets] = useState({});
    const [petDetailsReferrer, setPetDetailsReferrer] = useState("");

    return (
        <PetContext.Provider
            value={{
                searchResults,
                setSearchResults,
                petDetails,
                setPetDetails,
                petDetailsReferrer,
                setPetDetailsReferrer,
            }}
        >
            {children}
        </PetContext.Provider>
    );
};

export default PetContextProvider;
