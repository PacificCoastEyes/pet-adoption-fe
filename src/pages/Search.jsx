import { useContext, useEffect, useState } from "react";
import { PageBasedFormContext } from "../contexts/PageBasedFormContext";
import PageBasedForm from "../components/forms/PageBasedForm";
import SearchFormBodyTemplate from "../components/forms/SearchFormBodyTemplate";
import PetCard from "../components/PetCard";
import { instance } from "../axiosInstance";
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
        resetAlertPageBasedForm,
    } = useContext(PageBasedFormContext);

    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

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

    const { type, name, status, height, weight } = draftSearchData;

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        /* eslint-enable */
        document.title = title;
        resetAlertPageBasedForm("searchForm");
        /* eslint-disable */
    }, []);

    useEffect(() => {
        if (searchResults.length === 0) {
            setAlertVariant({ ...alertVariant, searchForm: "danger" });
            setAlertMsg({
                ...alertVariant,
                searchForm: "No results found",
            });
        } else {
            setAlertVariant({ ...alertVariant, searchForm: "success" });
            setAlertMsg({
                ...alertMsg,
                searchForm: `${searchResults.length} result${
                    searchResults.length !== 1 ? "s" : ""
                } found`,
            });
        }
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

    const getSearchResults = async () => {
        let queryUrl = "http://localhost:8080/pet?";
        for (const field in draftSearchData) {
            if (draftSearchData[field]) {
                queryUrl += `${field}=${draftSearchData[field]}&`;
            }
        }
        queryUrl = queryUrl.slice(0, queryUrl.length - 1);
        const res = await instance.get(queryUrl);
        setSearchResults([...res.data]);
        setIsHiddenAlert({ ...isHiddenAlert, searchForm: false });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await getSearchResults();
        } catch (err) {
            console.log(err);
            setIsHiddenAlert({ ...isHiddenAlert, searchForm: false });
            setAlertVariant({ ...alertVariant, searchForm: "danger" });
            setAlertMsg({
                ...alertMsg,
                searchForm: `Sorry, there was a problem with the search - ${err}`,
            });
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
                    handleReset={handleReset}
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
                        type={type}
                        status={status}
                        name={name}
                        height={height}
                        weight={weight}
                    />
                </PageBasedForm>
            </div>
            <div className="d-flex flex-wrap" id="search-results-container">
                {searchResults.length > 0 ? (
                    searchResults.map(result => {
                        const {
                            id,
                            type,
                            name,
                            status,
                            photo,
                            height,
                            weight,
                            color,
                            bio,
                            hypoallergenic,
                            dietRestrict,
                        } = result;
                        return (
                            <PetCard
                                key={id}
                                id={id}
                                type={type}
                                name={name}
                                status={status}
                                photo={photo}
                                height={height}
                                weight={weight}
                                color={color}
                                bio={bio}
                                hypoallergenic={hypoallergenic}
                                dietRestrict={dietRestrict}
                            />
                        );
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
