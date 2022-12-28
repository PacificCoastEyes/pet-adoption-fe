import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { PageBasedFormContext } from "../contexts/PageBasedFormContext";
import PageBasedForm from "../components/forms/PageBasedForm";
import ProfileFormBodyTemplate from "../components/forms/ProfileFormBodyTemplate";
import "../styles/Profile.css";
import "react-phone-input-2/lib/bootstrap.css";

const Profile = ({ title }) => {
    
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const {
        isHiddenAlert,
        setIsHiddenAlert,
        alertVariant,
        setAlertVariant,
        alertMsg,
        setAlertMsg,
        resetAlertPageBasedForm,
    } = useContext(PageBasedFormContext);

    useEffect(() => {
        /* eslint-enable */
        document.title = title;
        resetAlertPageBasedForm("profileForm");
        /* eslint-disable */
    }, []);


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

    const alertNewPasswordMismatch = () => {
        setAlertMsg({ ...alertMsg, profileForm: "New passwords do not match" });
    };

    const alertConfirmPasswordRequired = () => {
        setAlertMsg({
            ...alertMsg,
            profileForm: "Please re-enter your new password",
        });
    };

    const alertCurrentPasswordRequired = () => {
        setAlertMsg({
            ...alertMsg,
            profileForm: "Please enter your current password",
        });
    };

    const alertCurrentPasswordIncorrect = () => {
        setAlertMsg({
            ...alertMsg,
            profileForm: "The current password you entered is incorrect",
        });
    };

    const alertErrorGeneric = () => {
        setAlertMsg({
            ...alertMsg,
            profileForm: "Sorry, there was an error saving your profile",
        });
    };

    const alertSuccess = () => {
        setIsHiddenAlert({ ...isHiddenAlert, profileForm: false });
        setAlertVariant({ ...alertVariant, profileForm: "success" });
        setAlertMsg({ ...alertMsg, profileForm: "Profile saved!" });
    };

    const handleChange = e => {
        resetAlertPageBasedForm(["profileForm"]);
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
            setIsHiddenAlert({ ...isHiddenAlert, profileForm: false });
            setAlertVariant({ ...alertVariant, profileForm: "danger" });
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
            isHiddenAlert={isHiddenAlert.profileForm}
            alertVariant={alertVariant.profileForm}
            alertMsg={alertMsg.profileForm}
        >
            <ProfileFormBodyTemplate
                handleChange={handleChange}
                firstName={firstName}
                lastName={lastName}
                email={email}
                phone={phone}
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                currentPassword={currentPassword}
                bio={bio}
            />
        </PageBasedForm>
    );
};

export default Profile;
