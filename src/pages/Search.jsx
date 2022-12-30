import { useContext, useEffect, useState } from "react";
import { PageBasedFormContext } from "../contexts/PageBasedFormContext";
import PageBasedForm from "../components/forms/PageBasedForm";
import SearchFormBodyTemplate from "../components/forms/SearchFormBodyTemplate";
import PetCard from "../components/PetCard";
import "../styles/Search.css";

const Search = ({ title }) => {
    const {
        isHiddenAlert,
        setIsHiddenAlert,
        alertVariant,
        setAlertVariant,
        alertMsg,
        setAlertMsg,
        resetAlertPageBasedForm,
    } = useContext(PageBasedFormContext);

    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
    const [draftSearchData, setDraftSearchData] = useState({
        type: "",
        status: "available",
        name: "",
        photo: "",
        height: "",
        weight: "",
    });

    const { type, name, status, height, weight } = draftSearchData;

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        /* eslint-enable */
        document.title = title;
        resetAlertPageBasedForm("searchForm");
        /* eslint-disable */
    }, []);

    useEffect(() => {
        setAlertMsg({
            ...alertVariant,
            searchForm: `${searchResults.length} result${
                searchResults.length !== 1 ? "s" : ""
            } found`,
        });
    }, [searchResults]);

    const handleChange = e => {
        if (e.target.id === "dog" || e.target.id === "cat") {
            setDraftSearchData({ ...draftSearchData, type: e.target.value });
        } else if (
            e.target.id === "hypoallergenic-yes" ||
            e.target.id === "hypoallergenic-no"
        ) {
            setDraftSearchData({
                ...draftSearchData,
                hypoallergenic: e.target.value,
            });
        } else {
            let value = e.target.value;
            if (e.target.id === "height" || e.target.id === "weight")
                value = parseInt(value);
            setDraftSearchData({ ...draftSearchData, [e.target.id]: value });
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        setSearchResults([]);
        try {
            setIsHiddenAlert({ ...isHiddenAlert, searchForm: false });
            setAlertVariant({ ...alertVariant, searchForm: "success" });
            const petKeys = Object.keys(localStorage).filter(
                key => !key.includes("@")
            );
            if (petKeys.length === 0) throw new Error("noResults");
            const pets = [];
            petKeys.forEach(key =>
                pets.push(JSON.parse(localStorage.getItem(key)))
            );
            setSearchResults(pets.filter(pet => pet.type === type));
        } catch (err) {
            setIsHiddenAlert({ ...isHiddenAlert, searchForm: false });
            setAlertVariant({ ...alertVariant, searchForm: "danger" });
            switch (err.message) {
                case "noResults":
                    setAlertMsg({
                        ...alertVariant,
                        searchForm: "No results found",
                    });
                    break;
                default:
                    setAlertMsg({
                        ...alertVariant,
                        searchForm: `Sorry, there was a problem with the search - ${err}`,
                    });
            }
            console.log(err);
        }
    };

    return (
        <div id="search" className="d-flex">
            <div id="search-form-container">
                <PageBasedForm
                    isSearchForm={true}
                    onSubmit={handleSubmit}
                    headerTitle="Search Pets"
                    btnSubmitText="Search"
                    isAdvancedSearch={isAdvancedSearch}
                    setIsAdvancedSearch={setIsAdvancedSearch}
                    isHiddenAlert={isHiddenAlert.searchForm}
                    alertVariant={alertVariant.searchForm}
                    alertMsg={alertMsg.searchForm}
                >
                    <SearchFormBodyTemplate
                        isAdvancedSearch={isAdvancedSearch}
                        handleChange={handleChange}
                        status={status}
                        name={name}
                        height={height}
                        weight={weight}
                    />
                </PageBasedForm>
            </div>
            <div className="d-flex flex-wrap" id="search-results-container">
                {searchResults.length > 0 &&
                    searchResults.map(result => (
                        <PetCard
                            key={result.id}
                            id={result.id}
                            type={result.type}
                            name={result.name}
                            status={result.status}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Search;
