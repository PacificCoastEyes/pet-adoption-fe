import { useContext } from "react";
import { AuthModalContext } from "../contexts/AuthModalContext";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const SignUpForm = () => {
    const { signupFormData, setSignupFormData } = useContext(AuthModalContext);

    const { firstName, lastName, email, phone, password, confirmPassword } =
        signupFormData;

    const handleChange = e => {
        setSignupFormData({ ...signupFormData, [e.target.id]: e.target.value });
    };

    return (
        <>
            <Form.Control
                id="firstName"
                required
                value={firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="mb-3"
            />
            <Form.Control
                id="lastName"
                required
                value={lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="my-3"
            />
            <Form.Control
                id="email"
                type="email"
                required
                value={email}
                onChange={handleChange}
                placeholder="Email"
                className="my-3"
            />
            <PhoneInput
                country={"il"}
                value={phone}
                placeholder="Phone"
                inputProps={{
                    id: "phone",
                    required: true,
                    onChange: handleChange,
                }}
                className="my-3"
            />
            <Form.Control
                id="password"
                type="password"
                required
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="my-3"
            />
            <Form.Control
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="mt-3"
            />
        </>
    );
};

export default SignUpForm;
