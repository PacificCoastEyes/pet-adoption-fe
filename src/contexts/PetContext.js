import { createContext, useState } from "react";

export const PetContext = createContext();

const PetContextProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState({});
    const [petDetails, setPetDetails] = useState({});
    const [likedPets, setLikedPets] = useState({});
    const [ownedPets, setOwnedPets] = useState({});
    const [petDetailsReferrer, setPetDetailsReferrer] = useState("");
    const [isViewingLikedPets, setIsViewingLikedPets] = useState(false);

    return (
        <PetContext.Provider
            value={{
                searchResults,
                setSearchResults,
                petDetails,
                setPetDetails,
                likedPets,
                setLikedPets,
                ownedPets,
                setOwnedPets,
                petDetailsReferrer,
                setPetDetailsReferrer,
                isViewingLikedPets,
                setIsViewingLikedPets,
            }}
        >
            {children}
        </PetContext.Provider>
    );
};

export default PetContextProvider;
