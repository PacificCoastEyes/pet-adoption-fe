import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { PetContext } from "../contexts/PetContext";
import { Link } from "react-router-dom";
import { Badge, Button, Card } from "react-bootstrap";
import { BookmarkHeart, PersonFill } from "react-bootstrap-icons";
import "../styles/PetCard.css";
import "../styles/Toast.css";
import capitalize from "../utilities/capitalize";
import PetActionToast from "./PetActionToast";
import toggleSavePet from "../utilities/toggleSavePet";

const PetCard = ({ id, referrer }) => {
    const [showPetActionToast, setShowPetActionToast] = useState(false);
    const [textPetActionToast, setTextPetActionToast] = useState("");

    const { isLoggedIn, currentUser } = useContext(UserContext);
    const {
        searchResults,
        setSearchResults,
        setPetDetailsReferrer,
        savedPets,
        ownedPets,
    } = useContext(PetContext);

    let item;
    let petState;
    let setPetState;
    switch (referrer) {
        case "search":
            item = searchResults[id];
            petState = searchResults;
            setPetState = setSearchResults;
            break;
        case "owned":
            item = ownedPets[id];
            break;
        case "saved":
            item = savedPets[id];
            break;
        default:
            break;
    }

    const { uid, type, name, status, photo, isSaved } = item;

    return (
        <>
            <Card className="pet-card d-flex flex-column justify-content-between">
                <Card.Header className="d-flex justify-content-between align-items-center ps-3 pe-2 py-2">
                    <Badge pill className={`badge-type-${type}`}>
                        {capitalize(type)}
                    </Badge>
                    {isLoggedIn && referrer === "search" && (
                        <Button
                            variant={isSaved ? "dark" : "secondary"}
                            onClick={() => {
                                toggleSavePet(
                                    id,
                                    name,
                                    isSaved,
                                    petState,
                                    setPetState,
                                    setShowPetActionToast,
                                    setTextPetActionToast
                                );
                            }}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <BookmarkHeart className="me-2" />
                            {isSaved ? "Unsave" : "Save"}
                        </Button>
                    )}
                </Card.Header>
                <Card.Body className="pet-card-body p-0">
                    <Link
                        to={`/pet?id=${id}`}
                        onClick={() => setPetDetailsReferrer(referrer)}
                    >
                        <div className="d-flex flex-column justify-content-between h-100">
                            <img
                                src={photo}
                                alt={name}
                                className="align-self-center px-2 pt-2"
                            />
                            <div className="d-flex justify-content-between align-items-center mt-2 px-3 py-2 pet-card-body-end">
                                <div className="d-flex align-items-center">
                                    <Card.Title className="mt-2 me-1">
                                        {name}
                                    </Card.Title>
                                    {uid === currentUser.id && (
                                        <PersonFill className="mt-1" />
                                    )}
                                </div>
                                <Badge
                                    pill
                                    className={`badge-status-${status}`}
                                >
                                    {capitalize(status)}
                                </Badge>
                            </div>
                        </div>
                    </Link>
                </Card.Body>
            </Card>
            <PetActionToast
                showPetActionToast={showPetActionToast}
                setShowPetActionToast={setShowPetActionToast}
                textPetActionToast={textPetActionToast}
            />
        </>
    );
};

export default PetCard;
