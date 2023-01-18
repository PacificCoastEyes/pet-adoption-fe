import { Alert, Button, Spinner } from "react-bootstrap";

const PageBasedFormFooter = ({
    isHiddenAlert,
    isHiddenSpinner,
    alertVariant,
    alertMsg,
    handleReset,
    btnSubmitText,
}) => {
    return (
        <div className="form-footer d-flex justify-content-between align-items-center pt-3">
            <div className="d-flex">
                <Alert
                    variant={alertVariant}
                    className="alert-submit px-2 py-1 mb-0"
                    hidden={isHiddenAlert}
                >
                    {alertMsg}
                </Alert>
                <Spinner
                    animation="border"
                    variant="primary"
                    hidden={isHiddenSpinner}
                />
            </div>
            <div>
                <Button onClick={handleReset} variant="light" className="me-2">
                    Clear
                </Button>
                <Button type="submit">{btnSubmitText}</Button>
            </div>
        </div>
    );
};

export default PageBasedFormFooter;
