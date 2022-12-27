import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Form } from "react-bootstrap";
import PageBasedForm from "../components/PageBasedForm";
import PhoneInput from "react-phone-input-2";
import "../styles/Profile.css";
import "react-phone-input-2/lib/bootstrap.css";

const Profile = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [draftProfileData, setDraftProfileData] = useState({
        ...currentUser,
        newPassword: "",
        confirmPassword: "",
        currentPassword: "",
        bio: `${currentUser.bio ? currentUser.bio : ""}`,
    });

    const {
        firstName,
        lastName,
        email,
        phone,
        newPassword,
        confirmPassword,
        currentPassword,
        bio,
    } = draftProfileData;

    const [isHiddenAlert, setIsHiddenAlert] = useState(true);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    const resetAlert = () => {
        setIsHiddenAlert(true);
        setAlertVariant("");
        setAlertMsg("");
    };

    const alertNewPasswordMismatch = () => {
        setAlertMsg("New passwords do not match");
    };

    const alertConfirmPasswordRequired = () => {
        setAlertMsg("Please re-enter your new password");
    };

    const alertCurrentPasswordRequired = () => {
        setAlertMsg("Please enter your current password");
    };

    const alertCurrentPasswordIncorrect = () => {
        setAlertMsg("The current password you entered is incorrect");
    };

    const alertErrorGeneric = () => {
        setAlertMsg("Sorry, there was an error saving your profile");
    };

    const alertSuccess = () => {
        setIsHiddenAlert(false);
        setAlertVariant("success");
        setAlertMsg("Profile saved!");
    };

    const handleChange = e => {
        resetAlert();
        setDraftProfileData({
            ...draftProfileData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        try {
            if (newPassword && newPassword !== confirmPassword)
                throw new Error("newPasswordMismatch");
            if (newPassword && !confirmPassword)
                throw new Error("confirmPasswordRequired");
            if (newPassword && !currentPassword)
                throw new Error("currentPasswordRequired");
            if (newPassword && currentPassword !== currentUser.password)
                throw new Error("currentPasswordIncorrect");
            const relevantUserDataToSave = {
                firstName,
                lastName,
                email,
                phone,
                password: `${newPassword ? newPassword : currentUser.password}`,
                bio,
                isAdmin: currentUser.isAdmin,
            };
            localStorage.setItem(
                currentUser.email,
                JSON.stringify(relevantUserDataToSave)
            );
            setCurrentUser(relevantUserDataToSave);
            alertSuccess();
        } catch (err) {
            setIsHiddenAlert(false);
            setAlertVariant("danger");
            switch (err.message) {
                case "newPasswordMismatch":
                    alertNewPasswordMismatch();
                    break;
                case "confirmPasswordRequired":
                    alertConfirmPasswordRequired();
                    break;
                case "currentPasswordRequired":
                    alertCurrentPasswordRequired();
                    break;
                case "currentPasswordIncorrect":
                    alertCurrentPasswordIncorrect();
                    break;
                default:
                    alertErrorGeneric();
            }
            console.log(err);
        }
    };

    return (
        <PageBasedForm
            onSubmit={handleSubmit}
            headerTitle="My Profile"
            btnSubmitText="Save"
            isHiddenAlert={isHiddenAlert}
            alertVariant={alertVariant}
            alertMsg={alertMsg}
        >
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
                    id="newPassword"
                    placeholder="New Password"
                    value={newPassword}
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
                    disabled={newPassword ? false : true}
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
                    disabled={newPassword && confirmPassword ? false : true}
                />
            </Form.Group>
        </PageBasedForm>
    );
};

export default Profile;
