import { Form } from "react-bootstrap";

const LoginForm = ({ loginFormData, setLoginFormData }) => {
    const { email, password } = loginFormData;

    const handleChange = e => {
        setLoginFormData({ ...loginFormData, [e.target.id]: e.target.value });
    };

    return (
        <>
            <Form.Control
                id="email"
                type="email"
                required
                value={email}
                onChange={handleChange}
                placeholder="Email"
                className="mb-3"
            />
            <Form.Control
                id="password"
                type="password"
                required
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="mt-3"
            />
        </>
    );
};

export default LoginForm;
