import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { PageBasedFormContext } from "../contexts/PageBasedFormContext";
import { instance } from "../axiosInstance";
import PageBasedForm from "../components/forms/PageBasedForm";
import ProfileFormBodyTemplate from "../components/forms/ProfileFormBodyTemplate";
import "../styles/Profile.css";
import "react-phone-input-2/lib/bootstrap.css";

const Profile = ({ title }) => {
    const { currentUser } = useContext(UserContext);
    const {
        isHiddenAlert,
        setIsHiddenAlert,
        alertVariant,
        setAlertVariant,
        alertMsg,
        setAlertMsg,
        resetAlertPageBasedForm,
    } = useContext(PageBasedFormContext);

    const [isHiddenSpinner, setIsHiddenSpinner] = useState(true);

    useEffect(() => {
        document.title = title;
        resetAlertPageBasedForm("profileForm");
        // eslint-disable-next-line
    }, [title]);

    const draftProfileDataSchema = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        bio: "",
        password: "",
        confirmPassword: "",
        currentPassword: "",
    };

    const [draftProfileData, setDraftProfileData] = useState(
        draftProfileDataSchema
    );

    const handleReset = () => {
        setDraftProfileData(draftProfileDataSchema);
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await instance.get(
                    `https://thepethaven-be.azurewebsites.net/user/${currentUser.id}`
                );
                for (const field in res.data.user) {
                    if (res.data.user[field] === null)
                        res.data.user[field] = "";
                }
                setDraftProfileData({
                    ...draftProfileData,
                    ...res.data.user,
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserDetails();
        // eslint-disable-next-line
    }, [title, currentUser.id]);

    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
        currentPassword,
        bio,
    } = draftProfileData;

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

    const handleSubmit = async e => {
        e.preventDefault();
        setIsHiddenSpinner(false);
        setIsHiddenAlert({ ...isHiddenAlert, profileForm: true });
        try {
            await instance.put(
                `https://thepethaven-be.azurewebsites.net/user/${currentUser.id}`,
                draftProfileData
            );
            alertSuccess();
        } catch (err) {
            console.log(err);
            setIsHiddenAlert({ ...isHiddenAlert, profileForm: false });
            setAlertVariant({ ...alertVariant, profileForm: "danger" });
            setAlertMsg({
                ...alertMsg,
                profileForm: `There was a problem updating your profile. ${err.response.data}`,
            });
        } finally {
            setIsHiddenSpinner(true);
        }
    };

    return (
        <div className="py-4">
            <PageBasedForm
                onSubmit={handleSubmit}
                handleReset={handleReset}
                headerTitle="My Profile"
                btnSubmitText="Save"
                isHiddenAlert={isHiddenAlert.profileForm}
                isHiddenSpinner={isHiddenSpinner}
                alertVariant={alertVariant.profileForm}
                alertMsg={alertMsg.profileForm}
            >
                <ProfileFormBodyTemplate
                    handleChange={handleChange}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    phone={phone}
                    password={password}
                    confirmPassword={confirmPassword}
                    currentPassword={currentPassword}
                    bio={bio}
                />
            </PageBasedForm>
        </div>
    );
};

export default Profile;
