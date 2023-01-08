import { useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { BookmarkHeart } from "react-bootstrap-icons";
import "../styles/PetCard.css";

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
}) => {
    const [isSaved, setIsSaved] = useState(false);

    const capitalize = str => {
        return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
    };

    return (
        <Card className="pet-card">
            <Card.Header className="d-flex justify-content-between align-items-center p-2">
                <Badge pill className={`badge-type-${type}`}>
                    {capitalize(type)}
                </Badge>
                <Button
                    variant={isSaved ? "light" : "secondary"}
                    onClick={() => setIsSaved(!isSaved)}
                    className="d-flex justify-content-between align-items-center"
                >
                    <BookmarkHeart className="me-2" />
                    {isSaved ? "Unsave" : "Save"}
                </Button>
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
    );
};

export default PetCard;
