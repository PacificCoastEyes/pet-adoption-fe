import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageBasedFormContext } from "../contexts/PageBasedFormContext";
import PageBasedForm from "../components/forms/PageBasedForm";
import AddPetFormBodyTemplate from "../components/forms/AddPetFormBodyTemplate";
import { instance } from "../axiosInstance";
import { Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import "../styles/AddPet.css";

const AddPet = ({ title, isEditing }) => {
    const {
        isHiddenAlert,
        setIsHiddenAlert,
        alertVariant,
        setAlertVariant,
        alertMsg,
        setAlertMsg,
        resetAlertPageBasedForm,
    } = useContext(PageBasedFormContext);

    const draftPetDataSchema = useMemo(() => {
        return {
            type: "",
            breed: "",
            name: "",
            status: "",
            photo: null,
            height: "",
            weight: "",
            color: "",
            bio: "",
            hypoallergenic: "",
            dietRestrict: "",
        };
    }, []);

    const [draftPetData, setDraftPetData] = useState(draftPetDataSchema);

    const handleReset = useCallback(() => {
        setDraftPetData(draftPetDataSchema);
        document.getElementById("photo").value = null;
    }, [draftPetDataSchema]);

    useEffect(() => {
        document.title = title;
        resetAlertPageBasedForm("addPetForm");

        if (isEditing) {
            const fetchPetDetails = async () => {
                const params = new URL(document.location).searchParams;
                try {
                    const { data } = await instance.get(
                        `${process.env.REACT_APP_SERVER_URL}/pet/${params.get(
                            "id"
                        )}`
                    );
                    setDraftPetData(data);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchPetDetails();
        } else {
            handleReset();
        }
    }, [isEditing, title]);

    const {
        type,
        breed,
        name,
        status,
        height,
        weight,
        color,
        bio,
        hypoallergenic,
        dietRestrict,
    } = draftPetData;

    const handleChange = e => {
        if (e.target.id === "dog" || e.target.id === "cat") {
            setDraftPetData({
                ...draftPetData,
                type: e.target.id === "dog" ? "dog" : "cat",
            });
        } else if (
            e.target.id === "hypoallergenic-yes" ||
            e.target.id === "hypoallergenic-no"
        ) {
            setDraftPetData({
                ...draftPetData,
                hypoallergenic: e.target.id === "hypoallergenic-yes" ? 1 : 0,
            });
        } else if (e.target.id === "photo") {
            setDraftPetData({
                ...draftPetData,
                [e.target.id]: e.target.files[0],
            });
        } else {
            let value = e.target.value;
            if (e.target.id === "height" || e.target.id === "weight")
                value = parseInt(value);
            setDraftPetData({ ...draftPetData, [e.target.id]: value });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        for (const field in draftPetData) {
            formData.append(field, draftPetData[field]);
        }
        try {
            if (isEditing) {
                await instance.put(
                    `${process.env.REACT_APP_SERVER_URL}/pet/${draftPetData.id}`,
                    formData
                );
            } else {
                await instance.post(
                    `${process.env.REACT_APP_SERVER_URL}/pet`,
                    formData
                );
            }
            setIsHiddenAlert({ ...isHiddenAlert, addPetForm: false });
            setAlertVariant({ ...isHiddenAlert, addPetForm: "success" });
            setAlertMsg({
                ...isHiddenAlert,
                addPetForm: `Pet ${isEditing ? "updated" : "added"}!`,
            });
            if (!isEditing) handleReset();
        } catch (err) {
            console.log(err);
            setIsHiddenAlert({ ...isHiddenAlert, addPetForm: false });
            setAlertVariant({ ...isHiddenAlert, addPetForm: "danger" });
            setAlertMsg({
                ...isHiddenAlert,
                addPetForm: `Sorry, there was a problem ${
                    isEditing ? "updating" : "adding"
                } the pet - ${err.response.data}`,
            });
        }
    };

    const navigate = useNavigate();

    return (
        <div className="py-4" id="add-pet-container">
            {isEditing && (
                <div id="back-button-container-add-pet">
                    <Button
                        variant="secondary"
                        className="mb-3"
                        id="back-button"
                        onClick={() => navigate("/dashboard")}
                    >
                        <ArrowLeft className="me-2" />
                        Back to Dashboard
                    </Button>
                </div>
            )}
            <PageBasedForm
                onSubmit={handleSubmit}
                handleReset={handleReset}
                headerTitle={isEditing ? "Edit Pet" : "Add Pet"}
                btnSubmitText={isEditing ? "Update" : "Add"}
                isHiddenAlert={isHiddenAlert.addPetForm}
                alertVariant={alertVariant.addPetForm}
                alertMsg={alertMsg.addPetForm}
            >
                <AddPetFormBodyTemplate
                    isEditing={isEditing}
                    handleChange={handleChange}
                    type={type}
                    breed={breed}
                    name={name}
                    status={status}
                    height={height}
                    weight={weight}
                    color={color}
                    bio={bio}
                    hypoallergenic={hypoallergenic}
                    dietRestrict={dietRestrict}
                />
            </PageBasedForm>
        </div>
    );
};

export default AddPet;
