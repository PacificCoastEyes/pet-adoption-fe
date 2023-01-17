import { instance } from "../axiosInstance";
import { useContext, useEffect, useState } from "react";
import { PetContext } from "../contexts/PetContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import checkIfPetSaved from "../utilities/checkIfPetSaved";
import PetDetails from "../components/PetDetails";
import PetActionToast from "../components/PetActionToast";
import { ArrowLeft, ExclamationCircle } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import "../styles/Pet.css";

const Pet = ({ title }) => {
    const [showPetActionToast, setShowPetActionToast] = useState(false);
    const [textPetActionToast, setTextPetActionToast] = useState("");
    const [petNotFound, setPetNotFound] = useState(false);

    const { petDetails, setPetDetails, petDetailsReferrer } =
        useContext(PetContext);
    const { isLoggedIn, currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPetDetails = async id => {
            try {
                const { data } = await instance.get(
                    `$https://thepethaven-be.azurewebsites.net/pet/${id}`
                );
                if (isLoggedIn) {
                    let petObj = {};
                    petObj = await checkIfPetSaved({ [id]: data }, currentUser);
                    setPetDetails(petObj);
                } else {
                    setPetDetails({ [id]: data });
                }
            } catch (err) {
                console.log(err);
                setPetNotFound(true);
            }
        };

        document.title = title;
        const params = new URL(document.location).searchParams;
        const id = params.get("id");
        if (id) {
            fetchPetDetails(id);
        }
    }, [currentUser, isLoggedIn, setPetDetails, title]);
    return Object.keys(petDetails).length ? (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center px-3 py-4">
                <div>
                    {petDetailsReferrer && (
                        <Button
                            variant="secondary"
                            className="mb-3"
                            id="back-button"
                            onClick={() =>
                                navigate(
                                    petDetailsReferrer === "search"
                                        ? "/search"
                                        : "/mypets"
                                )
                            }
                        >
                            <ArrowLeft className="me-2" />
                            {petDetailsReferrer === "search"
                                ? "Back to Search Results"
                                : "Back to My Pets"}
                        </Button>
                    )}
                    <PetDetails
                        petDetailsReferrer={petDetailsReferrer}
                        setShowPetActionToast={setShowPetActionToast}
                        setTextPetActionToast={setTextPetActionToast}
                    />
                </div>
            </div>
            <PetActionToast
                showPetActionToast={showPetActionToast}
                setShowPetActionToast={setShowPetActionToast}
                textPetActionToast={textPetActionToast}
            />
        </>
    ) : (
        petNotFound && (
            <div
                className="d-flex justify-content-center align-items-center"
                id="pet-details-placeholder"
            >
                <ExclamationCircle />
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
