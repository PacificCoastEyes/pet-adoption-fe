import { useContext, useEffect, useState } from "react";
import { PageBasedFormContext } from "../contexts/PageBasedFormContext";
import { PetContext } from "../contexts/PetContext";
import { UserContext } from "../contexts/UserContext";
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

    const { pets, setPets } = useContext(PetContext);
    const { isLoggedIn, currentUser } = useContext(UserContext);

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

    useEffect(() => {
        /* eslint-enable */
        document.title = title;
        resetAlertPageBasedForm("searchForm");
        setPets({});
        /* eslint-disable */
    }, []);

    useEffect(() => {
        if (Object.keys(pets).length === 0) {
            setAlertVariant({ ...alertVariant, searchForm: "danger" });
            setAlertMsg({
                ...alertVariant,
                searchForm: "No results found",
            });
        } else {
            setAlertVariant({ ...alertVariant, searchForm: "success" });
            setAlertMsg({
                ...alertMsg,
                searchForm: `${Object.keys(pets).length} result${
                    Object.keys(pets).length !== 1 ? "s" : ""
                } found`,
            });
        }
    }, [pets]);

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

    const checkIfPetSaved = async petsObj => {
        for (const id in petsObj) {
            const res = await instance.get(
                `http://localhost:8080/pet/${id}/save?uid=${currentUser.id}`
            );
            petsObj[id] = {
                ...petsObj[id],
                isSaved: res.data ? true : false,
            };
        }
        return petsObj;
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
        let petsObj = {};
        for (const pet of res.data) {
            petsObj[pet.id] = { ...pet };
        }
        if (isLoggedIn) petsObj = await checkIfPetSaved(petsObj);
        setPets(petsObj);
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
                searchForm: `Sorry, there was a problem getting search results. ${err.response.data}`,
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
                {Object.keys(pets).length > 0 ? (
                    Object.values(pets).map(item => {
                        const {
                            id,
                            uid,
                            type,
                            breed,
                            name,
                            status,
                            photo,
                            height,
                            weight,
                            color,
                            bio,
                            hypoallergenic,
                            dietRestrict,
                            isSaved,
                        } = item;
                        return (
                            <PetCard
                                key={id}
                                id={id}
                                uid={uid}
                                type={type}
                                breed={breed}
                                name={name}
                                status={status}
                                photo={photo}
                                height={height}
                                weight={weight}
                                color={color}
                                bio={bio}
                                hypoallergenic={hypoallergenic}
                                dietRestrict={dietRestrict}
                                isSaved={isSaved}
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
