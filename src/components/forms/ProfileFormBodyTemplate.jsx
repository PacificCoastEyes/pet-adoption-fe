import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";

const ProfileFormBodyTemplate = ({
    handleChange,
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    currentPassword,
    bio,
}) => {
    return (
        <>
            <Form.Group className="mb-2">
                <label htmlFor="firstName" className="mt-2 mb-1">
                    First Name
                </label>
                <Form.Control
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="lastName" className="mt-2 mb-1">
                    Last Name
                </label>
                <Form.Control
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email" className="mt-2 mb-1">
                    Email
                </label>
                <Form.Control
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="phone" className="mt-2 mb-1">
                    Phone
                </label>
                <PhoneInput
                    country={"il"}
                    value={phone}
                    placeholder="Phone"
                    inputProps={{
                        id: "phone",
                        required: true,
                        onChange: handleChange,
                    }}
                />
                <label htmlFor="bio" className="mt-2 mb-1">
                    Bio
                </label>
                <Form.Control
                    as="textarea"
                    id="bio"
                    value={bio}
                    onChange={handleChange}
                    rows={4}
                />
            </Form.Group>
            <Form.Group className="my-2">
                <h4 className="mt-4 mb-0">Change Password</h4>
                <label htmlFor="password" className="mt-2 mb-1">
                    Enter New Password
                </label>
                <Form.Control
                    type="password"
                    id="password"
                    placeholder="New Password"
                    value={password}
                    onChange={handleChange}
                />
                <label htmlFor="confirmPassword" className="mt-2 mb-1">
                    Confirm New Password
                </label>
                <Form.Control
                    type="password"
                    id="confirmPassword"
                    placeholder="Re-type New Password"
                    value={confirmPassword}
                    onChange={handleChange}
                    disabled={password ? false : true}
                />
                <label htmlFor="currentPassword" className="mt-2 mb-1">
                    Enter Current Password
                </label>
                <Form.Control
                    type="password"
                    id="currentPassword"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={handleChange}
                    disabled={password && confirmPassword ? false : true}
                />
            </Form.Group>
        </>
    );
};

export default ProfileFormBodyTemplate;
