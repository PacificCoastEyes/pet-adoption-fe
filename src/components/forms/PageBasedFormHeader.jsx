import { Form } from "react-bootstrap";

const PageBasedFormHeader = ({
    headerTitle,
    isSearchForm,
    isAdvancedSearch,
    setIsAdvancedSearch,
}) => {
    return (
        <div
            className={`form-header ${
                isSearchForm && "d-flex justify-content-between"
            }`}
        >
            <h2 className="mb-0">{headerTitle}</h2>
            {isSearchForm && (
                <Form.Group
                    className="d-flex align-items-center mt-1"
                    id="advanced-search-toggle-container"
                >
                    <label htmlFor="advanced-search-toggle">
                        Advanced Search
                    </label>
                    <Form.Switch
                        id="advanced-search-toggle"
                        className="advanced-search-toggle"
                        value={isAdvancedSearch}
                        checked={isAdvancedSearch}
                        onChange={() => setIsAdvancedSearch(!isAdvancedSearch)}
                    />
                </Form.Group>
            )}
        </div>
    );
};

export default PageBasedFormHeader;
