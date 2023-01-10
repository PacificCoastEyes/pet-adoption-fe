import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { PetContext } from "../contexts/PetContext";
import { instance } from "../axiosInstance";
import { Link } from "react-router-dom";
import { Badge, Button, Card, Toast, ToastContainer } from "react-bootstrap";
import { BookmarkHeart, PersonFill } from "react-bootstrap-icons";
import "../styles/PetCard.css";
import "../styles/Toast.css";
import capitalize from "../utilities/capitalize";

const PetCard = ({ id, uid, type, name, status, photo, isSaved }) => {
    const [showPetSavedToast, setShowPetSavedToast] = useState(false);
    const [textPetSavedToast, setTextPetSavedToast] = useState("");

    const { isLoggedIn, currentUser } = useContext(UserContext);
    const { searchResults, setSearchResults } = useContext(PetContext);

    const toggleSavePet = async () => {
        try {
            !isSaved &&
                (await instance.post(`http://localhost:8080/pet/${id}/save`));
            isSaved &&
                (await instance.delete(`http://localhost:8080/pet/${id}/save`));
            setSearchResults({
                ...searchResults,
                [id]: { ...searchResults[id], isSaved: isSaved ? false : true },
            });
            setTextPetSavedToast(
                `${name} has been ${
                    isSaved ? "removed from" : "added to"
                } your saved pets.`
            );
        } catch (err) {
            setTextPetSavedToast(
                `Sorry, we ran into a problem ${
                    isSaved ? "removing" : "adding"
                } ${name} ${isSaved ? "from" : "to"} your saved pets.`
            );
        } finally {
            setShowPetSavedToast(true);
        }
    };

    return (
        <>
            <Card className="pet-card d-flex flex-column justify-content-between">
                <Card.Header className="d-flex justify-content-between align-items-center ps-3 pe-2 py-2">
                    <Badge pill className={`badge-type-${type}`}>
                        {capitalize(type)}
                    </Badge>
                    {isLoggedIn && (
                        <Button
                            variant={isSaved ? "dark" : "secondary"}
                            onClick={() => toggleSavePet()}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <BookmarkHeart className="me-2" />
                            {isSaved ? "Unsave" : "Save"}
                        </Button>
                    )}
                </Card.Header>
                <Card.Body className="pet-card-body p-0">
                    <Link to={`/pet?id=${id}`}>
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
    );
};

export default PetCard;
