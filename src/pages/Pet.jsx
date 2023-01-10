import { instance } from "../axiosInstance";
import { useContext, useEffect, useState } from "react";
import { PetContext } from "../contexts/PetContext";
import { useNavigate } from "react-router-dom";
import PetDetails from "../components/PetDetails";
import { ArrowLeft, InfoCircleFill } from "react-bootstrap-icons";
import { Button, ToastContainer, Toast } from "react-bootstrap";
import "../styles/Pet.css";

const Pet = ({ title }) => {
    const [petDetails, setPetDetails] = useState({});
    const [showPetSavedToast, setShowPetSavedToast] = useState(false);
    const [textPetSavedToast, setTextPetSavedToast] = useState("");
    const [petNotFound, setPetNotFound] = useState(false);

    const { petDetailsReferrer } = useContext(PetContext);
    const navigate = useNavigate();
    const {
        id,
        uid,
        type,
        breed,
        name,
        status,
        photo,
        height,
        weight,
        color,
        bio,
        hypoallergenic,
        dietRestrict,
    } = petDetails;

    useEffect(() => {
        const fetchPetDetails = async id => {
            try {
                const { data } = await instance.get(
                    `http://localhost:8080/pet/${id}`
                );
                setPetDetails(data);
            } catch (err) {
                console.log(err);
                setPetNotFound(true);
            }
        };

        document.title = title;
        const params = new URL(document.location).searchParams;
        const id = params.get("id");
        if (id) fetchPetDetails(id);
        // eslint-disable-next-line
    }, []);
    return Object.keys(petDetails).length ? (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center px-3 py-4">
                <div>
                    {petDetailsReferrer && (
                        <Button
                            variant="secondary"
                            className="mb-3"
                            id="back-button"
                            onClick={() => navigate("/search")}
                        >
                            <ArrowLeft className="me-2" />
                            {petDetailsReferrer === "search" &&
                                "Search Results"}
                        </Button>
                    )}
                    <PetDetails
                        isSaved={uid}
                        id={id}
                        uid={uid}
                        type={type}
                        breed={breed}
                        name={name}
                        status={status}
                        photo={photo}
                        height={height}
                        weight={weight}
                        color={color}
                        bio={bio}
                        hypoallergenic={hypoallergenic}
                        dietRestrict={dietRestrict}
                    />
                </div>
            </div>
            <ToastContainer position="top-end" className="toast-container">
                <Toast
                    show={showPetSavedToast}
                    onClose={() => setShowPetSavedToast(false)}
                    delay={6000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">The Pet Haven</strong>
                    </Toast.Header>
                    <Toast.Body>{textPetSavedToast}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    ) : (
        petNotFound && (
            <div
                className="d-flex justify-content-center align-items-center"
                id="pet-details-placeholder"
            >
                <InfoCircleFill />
                <h1 className="ms-4 mb-0">
                    {petNotFound
                        ? "404 Pet Not Found"
                        : "Pet details will appear here"}
                </h1>
            </div>
        )
    );
};

export default Pet;
