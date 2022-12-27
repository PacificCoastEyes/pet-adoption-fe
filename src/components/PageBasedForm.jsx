import { Form } from "react-bootstrap";
import "../styles/PageBasedForm.css";
import PageBasedFormBody from "./PageBasedFormBody";
import PageBasedFormFooter from "./PageBasedFormFooter";
import PageBasedFormHeader from "./PageBasedFormHeader";

const PageBasedForm = ({
    onSubmit,
    headerTitle,
    children,
    btnSubmitText,
    isHiddenAlert,
    alertVariant,
    alertMsg,
}) => {
    return (
        <div className="d-flex justify-content-center">
            <Form className="form" onSubmit={onSubmit}>
                <PageBasedFormHeader headerTitle={headerTitle} />
                <PageBasedFormBody>{children}</PageBasedFormBody>
                <PageBasedFormFooter
                    btnSubmitText={btnSubmitText}
                    isHiddenAlert={isHiddenAlert}
                    alertVariant={alertVariant}
                    alertMsg={alertMsg}
                />
            </Form>
        </div>
    );
};

export default PageBasedForm;
