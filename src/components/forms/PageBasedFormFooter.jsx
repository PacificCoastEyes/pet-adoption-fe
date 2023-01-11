import { Alert, Button } from "react-bootstrap";

const PageBasedFormFooter = ({
    isHiddenAlert,
    alertVariant,
    alertMsg,
    handleReset,
    btnSubmitText,
}) => {
    return (
        <div
            className={`form-footer d-flex justify-content-${
                isHiddenAlert ? "end" : "between"
            } align-items-center pt-3`}
        >
            <Alert
                variant={alertVariant}
                className="alert-submit px-2 py-1 mb-0"
                hidden={isHiddenAlert}
            >
                {alertMsg}
            </Alert>
            <div>
                <Button onClick={handleReset} variant="light" className="me-2">
                    Clear
                </Button>
                {btnSubmitText && (
                    <Button type="submit">{btnSubmitText}</Button>
                )}
            </div>
        </div>
    );
};

export default PageBasedFormFooter;
