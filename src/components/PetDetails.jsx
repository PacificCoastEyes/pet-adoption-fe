import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { PetContext } from "../contexts/PetContext";
import { instance } from "../axiosInstance";
import toggleSavePet from "../utilities/toggleSavePet";
import { Badge, Button, Card, Table } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import {
    ArrowCounterclockwise,
    BookmarkHeart,
    CalendarWeek,
    HouseHeart,
} from "react-bootstrap-icons";
import "../styles/PetDetails.css";
import capitalize from "../utilities/capitalize";

const PetDetails = ({ setShowPetActionToast, setTextPetActionToast }) => {
    const { isLoggedIn, currentUser } = useContext(UserContext);
    const { petDetails, setPetDetails } = useContext(PetContext);

    useEffect(() => () => setPetDetails({}), [setPetDetails]);

    const {
        isSaved,
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
    } = petDetails[Object.keys(petDetails)[0]];

    const [userOwns, setUserOwns] = useState(false);

    useEffect(() => {
        if (uid === currentUser.id) {
            setUserOwns(true);
        } else {
            setUserOwns(false);
        }
    }, [uid, currentUser.id]);

    const updatePetStatus = action => {
        let newStatus;
        switch (action) {
            case "foster":
                newStatus = "fostered";
                break;
            case "adopt":
                newStatus = "adopted";
                break;
            case "return":
                newStatus = "available";
                break;
            default:
                break;
        }
        setPetDetails({
            [id]: {
                ...petDetails[id],
                uid: action === "return" ? null : uid,
                status: newStatus,
            },
        });
        if (action === "return") {
            setUserOwns(false);
        } else {
            setUserOwns(true);
        }
    };

    const handlePetAction = async action => {
        try {
            let success;
            if (action === "foster" || action === "adopt") {
                success = await instance.post(
                    `https://thepethaven-be.azurewebsites.net/pet/${id}/adopt`,
                    { action: action }
                );
            } else {
                success = await instance.post(
                    `https://thepethaven-be.azurewebsites.net/pet/${id}/return`
                );
            }
            if (!success) throw new Error();
            updatePetStatus(action);
            setTextPetActionToast(`You've ${action}ed ${name}!`);
        } catch (err) {
            console.log(err);
            setTextPetActionToast(
                `Sorry, ${name} could not be ${action}ed. ${err.response.data}`
            );
        } finally {
            setShowPetActionToast(true);
        }
    };

    return (
        <Card id="pet-details-card">
            <Card.Header className="d-flex justify-content-between align-items-center ps-4 pe-3 py-3">
                <div
                    className="d-flex align-items-center"
                    id="pet-details-card-header-left"
                >
                    <h2 className="m-0">{name}</h2>
                    <Badge pill className={`badge-type-${type} ms-3`}>
                        {capitalize(type)}
                    </Badge>
                    {userOwns && <PersonFill className="mt-1 ms-3" />}
                </div>
                {isLoggedIn && (
                    <Button
                        variant={isSaved ? "dark" : "secondary"}
                        onClick={() => {
                            toggleSavePet(
                                id,
                                name,
                                isSaved,
                                petDetails,
                                setPetDetails,
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
            <Card.Body className="d-flex justify-content-center px-4">
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
                        <tr>
                            <td>Hypoallergenic</td>
                            <td>{hypoallergenic ? "Yes" : "No"}</td>
                        </tr>
                        {dietRestrict && (
                            <tr>
                                <td>Dietary Restrictions</td>
                                <td id="diet-restrict">{dietRestrict}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
            {isLoggedIn && (
                <Card.Footer className="d-flex justify-content-around align-items-center p-3">
                    {status === "available" && (
                        <Button
                            variant="warning"
                            onClick={() => handlePetAction("foster")}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <CalendarWeek className="me-2" />
                            Foster
                        </Button>
                    )}
                    {((status !== "adopted" && !uid) ||
                        (status === "fostered" && uid)) && (
                        <Button
                            variant="danger"
                            onClick={() => handlePetAction("adopt")}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <HouseHeart className="me-2" />
                            Adopt
                        </Button>
                    )}
                    {userOwns && (
                        <Button
                            variant="info"
                            onClick={() => handlePetAction("return")}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <ArrowCounterclockwise className="me-2" />
                            Return
                        </Button>
                    )}
                </Card.Footer>
            )}
        </Card>
    );
};

export default PetDetails;
