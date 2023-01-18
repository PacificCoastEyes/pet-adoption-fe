import { useContext, useEffect, useState } from "react";
import { PageBasedFormContext } from "../contexts/PageBasedFormContext";
import { PetContext } from "../contexts/PetContext";
import { SearchContext } from "../contexts/SearchContext";
import { UserContext } from "../contexts/UserContext";
import PageBasedForm from "../components/forms/PageBasedForm";
import SearchFormBodyTemplate from "../components/forms/SearchFormBodyTemplate";
import PetCard from "../components/PetCard";
import { instance } from "../axiosInstance";
import checkIfPetSaved from "../utilities/checkIfPetSaved";
import { SearchHeart } from "react-bootstrap-icons";
import "../styles/Search.css";

const Search = ({ title }) => {
    const {
        isHiddenAlert,
        setIsHiddenAlert,
        alertVariant,
        setAlertVariant,
        alertMsg,
        setAlertMsg,
    } = useContext(PageBasedFormContext);

    const { searchResults, setSearchResults } = useContext(PetContext);
    const {
        draftSearchDataSchema,
        draftSearchData,
        setDraftSearchData,
        isAdvancedSearch,
        setIsAdvancedSearch,
    } = useContext(SearchContext);
    const { isLoggedIn, currentUser } = useContext(UserContext);

    const { type, name, status, height, weight } = draftSearchData;

    const [isHiddenSpinner, setIsHiddenSpinner] = useState(true);

    useEffect(() => {
        document.title = title;
    }, [title]);

    const getSearchResults = async () => {
        let queryUrl = "https://thepethaven-be.azurewebsites.net/pet?";
        for (const field in draftSearchData) {
            if (draftSearchData[field]) {
                queryUrl += `${field}=${draftSearchData[field]}&`;
            }
        }
        queryUrl = queryUrl.slice(0, queryUrl.length - 1);
        const res = await instance.get(queryUrl);
        let petsObj = {};
        for (const pet of res.data) {
            petsObj[pet.id] = { ...pet };
        }
        if (isLoggedIn) petsObj = await checkIfPetSaved(petsObj, currentUser);
        setSearchResults(petsObj);
        setIsHiddenAlert({ ...isHiddenAlert, searchForm: false });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsHiddenSpinner(false);
        setIsHiddenAlert({ ...isHiddenAlert, searchForm: true });
        try {
            await getSearchResults();
        } catch (err) {
            console.log(err);
            setIsHiddenAlert({ ...isHiddenAlert, searchForm: false });
            setAlertVariant({ ...alertVariant, searchForm: "danger" });
            setAlertMsg({
                ...alertMsg,
                searchForm: `Sorry, there was a problem getting search results. ${err.response.data}`,
            });
        } finally {
            setIsHiddenSpinner(true);
        }
    };

    useEffect(() => {
        if (Object.keys(searchResults).length === 0) {
            setAlertVariant({ ...alertVariant, searchForm: "danger" });
            setAlertMsg({
                ...alertVariant,
                searchForm: "No results found",
            });
        } else {
            setAlertVariant({ ...alertVariant, searchForm: "success" });
            setAlertMsg({
                ...alertMsg,
                searchForm: `${Object.keys(searchResults).length} result${
                    Object.keys(searchResults).length !== 1 ? "s" : ""
                } found`,
            });
        }
        // eslint-disable-next-line
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

    const handleReset = () => {
        setDraftSearchData(draftSearchDataSchema);
    };

    return (
        <div id="search" className="d-flex">
            <div id="search-form-container">
                <PageBasedForm
                    isSearchForm={true}
                    onSubmit={handleSubmit}
                    btnSubmitText="Search"
                    handleReset={handleReset}
                    headerTitle="Search Pets"
                    isAdvancedSearch={isAdvancedSearch}
                    setIsAdvancedSearch={setIsAdvancedSearch}
                    isHiddenAlert={isHiddenAlert.searchForm}
                    isHiddenSpinner={isHiddenSpinner}
                    alertVariant={alertVariant.searchForm}
                    alertMsg={alertMsg.searchForm}
                >
                    <SearchFormBodyTemplate
                        isAdvancedSearch={isAdvancedSearch}
                        handleChange={handleChange}
                        type={type}
                        status={status}
                        name={name}
                        height={height}
                        weight={weight}
                    />
                </PageBasedForm>
            </div>
            <div className="d-flex flex-wrap" id="search-results-container">
                {Object.keys(searchResults).length > 0 ? (
                    Object.values(searchResults).map(item => {
                        const { id } = item;
                        return <PetCard key={id} id={id} referrer="search" />;
                    })
                ) : (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        id="search-heart"
                    >
                        <SearchHeart />
                        <h1>Your search results will appear here</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
