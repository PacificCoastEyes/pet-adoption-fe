import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { PetContext } from "../contexts/PetContext";
import { instance } from "../axiosInstance";
import { Badge, Button, Card, Toast, ToastContainer } from "react-bootstrap";
import { BookmarkHeart } from "react-bootstrap-icons";
import "../styles/PetCard.css";
import "../styles/Toast.css";

const PetCard = ({
    id,
    type,
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
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [textSuccessToast, setTextSuccessToast] = useState("");

    const { isLoggedIn, currentUser } = useContext(UserContext);
    const { pets, setPets } = useContext(PetContext);

    const capitalize = str => {
        return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
    };

    const toggleSavePet = async () => {
        try {
            !isSaved &&
                (await instance.post(`http://localhost:8080/pet/${id}/save`, {
                    uid: currentUser.id,
                }));
            isSaved &&
                (await instance.delete(`http://localhost:8080/pet/${id}/save`, {
                    data: { uid: currentUser.id },
                }));
            setPets({
                ...pets,
                [id]: { ...pets[id], isSaved: isSaved ? false : true },
            });
            console.log(pets);
            setShowSuccessToast(true);
            setTextSuccessToast(
                `${name} has been ${
                    isSaved ? "remvoved from" : "added to"
                } your saved pets.`
            );
        } catch (err) {
            setShowSuccessToast(true);
            setTextSuccessToast(
                `Sorry, we ran into a problem ${
                    isSaved ? "removing" : "adding"
                } ${name} ${isSaved ? "from" : "to"} your saved pets.`
            );
        }
    };

    return (
        <>
            <Card className="pet-card">
                <Card.Header className="d-flex justify-content-between align-items-center p-2">
                    <Badge pill className={`badge-type-${type}`}>
                        {capitalize(type)}
                    </Badge>
                    {isLoggedIn && (
                        <Button
                            variant={isSaved ? "light" : "secondary"}
                            onClick={() => toggleSavePet()}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <BookmarkHeart className="me-2" />
                            {isSaved ? "Unsave" : "Save"}
                        </Button>
                    )}
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between p-2">
                    <img src={photo} alt={name} className="align-self-center" />
                    <div className="d-flex justify-content-between align-items-center mt-2 px-2">
                        <Card.Title className="mt-2">{name}</Card.Title>
                        <Badge pill className={`badge-status-${status}`}>
                            {capitalize(status)}
                        </Badge>
                    </div>
                </Card.Body>
                <Card.Footer className="p-2">
                    <Button variant="primary" className="btn-see-more">
                        See More
                    </Button>
                </Card.Footer>
            </Card>
            <ToastContainer position="top-end" className="toast-container">
                <Toast
                    show={showSuccessToast}
                    onClose={() => setShowSuccessToast(false)}
                    delay={6000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">The Pet Haven</strong>
                    </Toast.Header>
                    <Toast.Body>{textSuccessToast}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default PetCard;
