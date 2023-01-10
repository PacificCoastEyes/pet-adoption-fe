import { createContext, useState } from "react";

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
    const draftSearchDataSchema = {
        type: "",
        status: "",
        name: "",
        photo: "",
        height: "",
        weight: "",
    };

    const [draftSearchData, setDraftSearchData] = useState(
        draftSearchDataSchema
    );

    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

    return (
        <SearchContext.Provider
            value={{
                draftSearchDataSchema,
                draftSearchData,
                setDraftSearchData,
                isAdvancedSearch,
                setIsAdvancedSearch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContextProvider;
