import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { PetContext } from "../../contexts/PetContext";
import { instance } from "../../axiosInstance";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import {
    ArrowCounterclockwise,
    BookmarkHeart,
    CalendarWeek,
    HouseHeart,
} from "react-bootstrap-icons";
import "../../styles/PetDetailsModal.css";

const PetDetailsModal = ({
    showPetDetailsModal,
    setShowPetDetailsModal,
    toggleSavePet,
    isSaved,
    setShowPetToast,
    setTextPetToast,
    capitalize,
    id,
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
}) => {
    const { isLoggedIn } = useContext(UserContext);
    const { pets, setPets } = useContext(PetContext);

    const updatePetStatus = action => {
        setPets({
            ...pets,
            [id]: {
                ...pets[id],
                status: action === "foster" ? "fostered" : "adopted",
            },
        });
    };

    const handleFosterOrAdopt = async action => {
        try {
            const success = await instance.post(
                `http://localhost:8080/pet/${id}/adopt`,
                { action: action }
            );
            if (!success) throw new Error();
            updatePetStatus(action);
            setTextPetToast(`You've ${action}ed ${name}!`);
        } catch (err) {
            console.log(err);
            setTextPetToast(`Sorry, ${name} could not be ${action}ed.`);
        } finally {
            setShowPetToast(true);
        }
    };

    return (
        <Modal
            show={showPetDetailsModal}
            onHide={() => setShowPetDetailsModal(false)}
            id="pet-details-modal"
        >
            <Modal.Header closeButton>
                <h2 className="m-0">{name}</h2>
                <Badge pill className={`badge-type-${type} ms-3`}>
                    {capitalize(type)}
                </Badge>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center px-4">
                <img src={photo} alt={name} />
                <Table striped borderless id="pet-details-table">
                    <tbody>
                        <tr>
                            <td>Type</td>
                            <td>{capitalize(type)}</td>
                        </tr>
                        {breed && (
                            <tr>
                                <td>Breed</td>
                                <td>{breed}</td>
                            </tr>
                        )}
                        <tr>
                            <td>Name</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{capitalize(status)}</td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>{height} cm</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{weight} kg</td>
                        </tr>
                        {color && (
                            <tr>
                                <td>Color</td>
                                <td>{color}</td>
                            </tr>
                        )}
                        {bio && (
                            <tr>
                                <td>Bio</td>
                                <td>{bio}</td>
                            </tr>
                        )}
                        {hypoallergenic && (
                            <tr>
                                <td>Hypoallergenic</td>
                                <td>{hypoallergenic ? "Yes" : "No"}</td>
                            </tr>
                        )}
                        {dietRestrict && (
                            <tr>
                                <td>Dietary Restrictions</td>
                                <td id="diet-restrict">{dietRestrict}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Modal.Body>
            {isLoggedIn && (
                <Modal.Footer>
                    <Button
                        variant={isSaved ? "dark" : "secondary"}
                        onClick={() => toggleSavePet()}
                        className="d-flex justify-content-between align-items-center"
                    >
                        <BookmarkHeart className="me-2" />
                        {isSaved ? "Unsave" : "Save"}
                    </Button>
                    {status !== "fostered" && (
                        <Button
                            variant="warning"
                            onClick={() => handleFosterOrAdopt("foster")}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <CalendarWeek className="me-2" />
                            Foster
                        </Button>
                    )}
                    {status !== "adopted" && (
                        <Button
                            variant="danger"
                            onClick={() => handleFosterOrAdopt("adopt")}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <HouseHeart className="me-2" />
                            Adopt
                        </Button>
                    )}
                    {(status === "fostered" || status === "adopted") && (
                        <Button
                            variant="info"
                            // onClick={() => toggleSavePet()}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <ArrowCounterclockwise className="me-2" />
                            Return
                        </Button>
                    )}
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default PetDetailsModal;
