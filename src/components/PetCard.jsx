import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { PetContext } from "../contexts/PetContext";
import { instance } from "../axiosInstance";
import { Badge, Button, Card, Toast, ToastContainer } from "react-bootstrap";
import PetDetailsModal from "./modals/PetDetailsModal";
import { BookmarkHeart, PersonFill } from "react-bootstrap-icons";
import "../styles/PetCard.css";
import "../styles/Toast.css";

const PetCard = ({
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
    isSaved,
}) => {
    const [showPetToast, setShowPetToast] = useState(false);
    const [textPetToast, setTextPetToast] = useState("");
    const [showPetDetailsModal, setShowPetDetailsModal] = useState(false);

    const { isLoggedIn, currentUser } = useContext(UserContext);
    const { pets, setPets } = useContext(PetContext);

    const capitalize = str => {
        return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
    };

    const toggleSavePet = async () => {
        try {
            !isSaved &&
                (await instance.post(`http://localhost:8080/pet/${id}/save`));
            isSaved &&
                (await instance.delete(`http://localhost:8080/pet/${id}/save`));
            setPets({
                ...pets,
                [id]: { ...pets[id], isSaved: isSaved ? false : true },
            });
            setTextPetToast(
                `${name} has been ${
                    isSaved ? "removed from" : "added to"
                } your saved pets.`
            );
        } catch (err) {
            setTextPetToast(
                `Sorry, we ran into a problem ${
                    isSaved ? "removing" : "adding"
                } ${name} ${isSaved ? "from" : "to"} your saved pets.`
            );
        } finally {
            setShowPetToast(true);
        }
    };

    return (
        <>
            <Card className="pet-card">
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
                <Card.Body
                    onClick={() => setShowPetDetailsModal(true)}
                    className="pet-card-body d-flex flex-column justify-content-between p-0"
                >
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
                        <Badge pill className={`badge-status-${status}`}>
                            {capitalize(status)}
                        </Badge>
                    </div>
                </Card.Body>
            </Card>
            <PetDetailsModal
                showPetDetailsModal={showPetDetailsModal}
                setShowPetDetailsModal={setShowPetDetailsModal}
                toggleSavePet={toggleSavePet}
                isSaved={isSaved}
                setShowPetToast={setShowPetToast}
                setTextPetToast={setTextPetToast}
                capitalize={capitalize}
                id={id}
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
            <ToastContainer position="top-end" className="toast-container">
                <Toast
                    show={showPetToast}
                    onClose={() => setShowPetToast(false)}
                    delay={6000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">The Pet Haven</strong>
                    </Toast.Header>
                    <Toast.Body>{textPetToast}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default PetCard;
