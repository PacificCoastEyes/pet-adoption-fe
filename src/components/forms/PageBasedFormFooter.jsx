import { Alert, Button } from "react-bootstrap";

const PageBasedFormFooter = ({ isHiddenAlert, alertVariant, alertMsg, btnSubmitText }) => {
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
            <Button type="submit">{btnSubmitText}</Button>
        </div>
    );
};

export default PageBasedFormFooter;
