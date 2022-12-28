import { v4 as uuid } from "uuid";
import { useContext, useEffect, useState } from "react";
import { PageBasedFormContext } from "../contexts/PageBasedFormContext";
import PageBasedForm from "../components/forms/PageBasedForm";
import AddPetFormBodyTemplate from "../components/forms/AddPetFormBodyTemplate";

const AddPet = ({title}) => {
    const {
        isHiddenAlert,
        setIsHiddenAlert,
        alertVariant,
        setAlertVariant,
        alertMsg,
        setAlertMsg,
        resetAlertPageBasedForm,
    } = useContext(PageBasedFormContext);

    const [draftPetData, setDraftPetData] = useState({
        type: "",
        breed: "",
        name: "",
        status: "",
        photo: "",
        height: "",
        weight: "",
        color: "",
        bio: "",
        hypoallergenic: false,
        dietRestrict: "",
    });

    const {
        breed,
        name,
        status,
        photo,
        height,
        weight,
        color,
        bio,
        dietRestrict,
    } = draftPetData;

    useEffect(() => {
        /* eslint-enable */
        document.title = title;
        resetAlertPageBasedForm("addPetForm");
        /* eslint-disable */
    }, []);

    const handleChange = e => {
        if (e.target.id === "dog" || e.target.id === "cat") {
            setDraftPetData({ ...draftPetData, type: e.target.value });
        } else if (e.target.id === "hypoallergenic-yes" || e.target.id === "hypoallergenic-no") {
            setDraftPetData({ ...draftPetData, hypoallergenic: e.target.value });
        } else {
            setDraftPetData({ ...draftPetData, [e.target.id]: e.target.value });
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const pet = {
            id: uuid(),
            ...draftPetData,
        };
        try {
            localStorage.setItem(pet.id, JSON.stringify(pet));
            setIsHiddenAlert({ ...isHiddenAlert, addPetForm: false });
            setAlertVariant({ ...isHiddenAlert, addPetForm: "success" });
            setAlertMsg({ ...isHiddenAlert, addPetForm: "Pet added!" });
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
                photo={photo}
                height={height}
                weight={weight}
                color={color}
                bio={bio}
                dietRestrict={dietRestrict}
            />
        </PageBasedForm>
    );
};

export default AddPet;
