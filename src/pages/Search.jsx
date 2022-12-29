import { useContext, useEffect, useState } from "react";
import { PageBasedFormContext } from "../contexts/PageBasedFormContext";
import PageBasedForm from "../components/forms/PageBasedForm";
import SearchFormBodyTemplate from "../components/forms/SearchFormBodyTemplate";
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

    const { name, status, height, weight } = draftSearchData;

    useEffect(() => {
        /* eslint-enable */
        document.title = title;
        resetAlertPageBasedForm("searchForm");
        /* eslint-disable */
    }, []);

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
        try {
            setIsHiddenAlert({ ...isHiddenAlert, searchForm: false });
            setAlertVariant({ ...alertVariant, searchForm: "success" });
            setAlertMsg({ ...alertVariant, searchForm: "results found" });
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
            <div>
                sfkldsjf
            </div>
        </div>
    );
};

export default Search;
