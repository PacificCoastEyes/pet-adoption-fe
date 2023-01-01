import { createContext, useState } from "react";

export const PetContext = createContext();

const PetContextProvider = ({children}) => {
    const [pets, setPets] = useState([]);

    return (
        <PetContext.Provider value={{pet, setPets}}>
            {children}
        </PetContext.Provider>
    )

}

export default PetContextProvider;