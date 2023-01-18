import { Form } from "react-bootstrap";
import "../../styles/PageBasedForm.css";
import PageBasedFormBody from "./PageBasedFormBody";
import PageBasedFormFooter from "./PageBasedFormFooter";
import PageBasedFormHeader from "./PageBasedFormHeader";

const PageBasedForm = ({
    onSubmit,
    headerTitle,
    children,
    handleReset,
    btnSubmitText,
    isHiddenAlert,
    isHiddenSpinner,
    alertVariant,
    alertMsg,
    isSearchForm,
    isAdvancedSearch,
    setIsAdvancedSearch,
}) => {
    return (
        <div className="d-flex justify-content-center">
            <Form className="form" onSubmit={onSubmit}>
                <PageBasedFormHeader
                    headerTitle={headerTitle}
                    isSearchForm={isSearchForm}
                    isAdvancedSearch={isAdvancedSearch}
                    setIsAdvancedSearch={setIsAdvancedSearch}
                />
                <PageBasedFormBody>{children}</PageBasedFormBody>
                <PageBasedFormFooter
                    btnSubmitText={btnSubmitText}
                    isHiddenAlert={isHiddenAlert}
                    isHiddenSpinner={isHiddenSpinner}
                    handleReset={handleReset}
                    alertVariant={alertVariant}
                    alertMsg={alertMsg}
                />
            </Form>
        </div>
    );
};

export default PageBasedForm;
