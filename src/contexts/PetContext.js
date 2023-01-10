import { createContext, useState } from "react";

export const PetContext = createContext();

const PetContextProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState({});
    // const [likedPets, setLikedPets] = useState({});
    // const [ownedPets, setOwnedPets] = useState({});

    return (
        <PetContext.Provider value={{ searchResults, setSearchResults }}>
            {children}
        </PetContext.Provider>
    );
};

export default PetContextProvider;
