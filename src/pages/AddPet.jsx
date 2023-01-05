import { useContext, useEffect, useState } from "react";
import { PageBasedFormContext } from "../contexts/PageBasedFormContext";
import PageBasedForm from "../components/forms/PageBasedForm";
import AddPetFormBodyTemplate from "../components/forms/AddPetFormBodyTemplate";
import { instance } from "../axiosInstance";

const AddPet = ({ title }) => {
    const {
        isHiddenAlert,
        setIsHiddenAlert,
        alertVariant,
        setAlertVariant,
        alertMsg,
        setAlertMsg,
        resetAlertPageBasedForm,
    } = useContext(PageBasedFormContext);

    const draftPetDataSchema = {
        type: "",
        breed: "",
        name: "",
        status: "available",
        photo: null,
        height: "",
        weight: "",
        color: "",
        bio: "",
        hypoallergenic: "",
        dietRestrict: "",
    };

    const [draftPetData, setDraftPetData] = useState(draftPetDataSchema);

    const { breed, name, status, height, weight, color, bio, dietRestrict } =
        draftPetData;

    const resetDraftPetData = () => {
        setDraftPetData(draftPetDataSchema);
        document.getElementById("photo").value = null;
    };

    useEffect(() => {
        /* eslint-enable */
        document.title = title;
        resetAlertPageBasedForm("addPetForm");
        /* eslint-disable */
    }, []);

    const handleChange = e => {
        if (e.target.id === "dog" || e.target.id === "cat") {
            setDraftPetData({ ...draftPetData, type: e.target.value });
        } else if (
            e.target.id === "hypoallergenic-yes" ||
            e.target.id === "hypoallergenic-no"
        ) {
            setDraftPetData({
                ...draftPetData,
                hypoallergenic: e.target.value,
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
            await instance.post("http://localhost:8080/pet", formData);
            setIsHiddenAlert({ ...isHiddenAlert, addPetForm: false });
            setAlertVariant({ ...isHiddenAlert, addPetForm: "success" });
            setAlertMsg({ ...isHiddenAlert, addPetForm: "Pet added!" });
            resetDraftPetData();
        } catch (err) {
            setIsHiddenAlert({ ...isHiddenAlert, addPetForm: false });
            setAlertVariant({ ...isHiddenAlert, addPetForm: "danger" });
            setAlertMsg({
                ...isHiddenAlert,
                addPetForm: `Sorry, there was a problem adding the pet - ${err}`,
            });
            console.log(err);
        }
    };

    return (
        <div className="py-4">
            <PageBasedForm
                onSubmit={handleSubmit}
                headerTitle="Add Pet"
                btnSubmitText="Add"
                isHiddenAlert={isHiddenAlert.addPetForm}
                alertVariant={alertVariant.addPetForm}
                alertMsg={alertMsg.addPetForm}
            >
                <AddPetFormBodyTemplate
                    handleChange={handleChange}
                    breed={breed}
                    name={name}
                    status={status}
                    height={height}
                    weight={weight}
                    color={color}
                    bio={bio}
                    dietRestrict={dietRestrict}
                />
            </PageBasedForm>
        </div>
    );
};

export default AddPet;
