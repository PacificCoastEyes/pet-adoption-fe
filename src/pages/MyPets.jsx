import { useContext, useEffect } from "react";
import { PetContext } from "../contexts/PetContext";
import { UserContext } from "../contexts/UserContext";
import PetCard from "../components/PetCard";
import { instance } from "../axiosInstance";
import checkIfPetSaved from "../utilities/checkIfPetSaved";
import { Form } from "react-bootstrap";
import { BookmarkHeart, CalendarWeek, HouseHeart } from "react-bootstrap-icons";
import "../styles/MyPets.css";

const MyPets = ({ title }) => {
    const {
        likedPets,
        setLikedPets,
        ownedPets,
        setOwnedPets,
        isViewingLikedPets,
        setIsViewingLikedPets,
    } = useContext(PetContext);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        /* eslint-enable */
        document.title = title;
        getPets();
        /* eslint-disable */
    }, [isViewingLikedPets]);

    const getPets = async () => {
        let queryUrl = `http://localhost:8080/pet/user/${currentUser.id}${
            isViewingLikedPets ? "?likedPets=true" : ""
        }`;
        const res = await instance.get(queryUrl);
        let petsObj = {};
        for (const pet of res.data) {
            petsObj[pet.id] = { ...pet };
        }
        petsObj = await checkIfPetSaved(petsObj, currentUser);
        if (isViewingLikedPets) {
            setLikedPets(petsObj);
        } else {
            setOwnedPets(petsObj);
        }
    };

    return (
        <div
            id="my-pets"
            className="d-flex flex-column justify-content-center align-items-center"
        >
            <div
                className="d-flex justify-content-between align-items-center w-100"
                id="my-pets-header"
            >
                <h2>
                    {isViewingLikedPets
                        ? "Liked Pets"
                        : "Fostered and Adopted Pets"}
                </h2>
                <Form.Group
                    className="d-flex align-items-center"
                    id="my-pets-toggle-container"
                >
                    <label htmlFor="my-pets-toggle" className="me-2">
                        Fostered and Adopted Pets
                    </label>
                    <Form.Switch
                        id="my-pets-toggle"
                        className="my-pets-toggle mx-2"
                        checked={isViewingLikedPets}
                        onChange={() =>
                            setIsViewingLikedPets(!isViewingLikedPets)
                        }
                    />
                    <label htmlFor="my-pets-toggle">Liked Pets</label>
                </Form.Group>
            </div>
            <div className="d-flex flex-wrap mt-3" id="my-pets-container">
                {Object.keys(isViewingLikedPets ? likedPets : ownedPets)
                    .length > 0 ? (
                    Object.values(
                        isViewingLikedPets ? likedPets : ownedPets
                    ).map(item => {
                        const { id } = item;
                        return (
                            <PetCard
                                key={id}
                                id={id}
                                referrer={
                                    isViewingLikedPets ? "liked" : "owned"
                                }
                            />
                        );
                    })
                ) : (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        id="my-pets-placeholder"
                    >
                        {isViewingLikedPets ? (
                            <div id="bookmark-heart" className="me-3">
                                <BookmarkHeart />
                            </div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <div id="calendar-week">
                                    <CalendarWeek />
                                </div>
                                <div id="house-heart" className="ms-4 me-3">
                                    <HouseHeart />
                                </div>
                            </div>
                        )}
                        <h1>
                            You currently have no
                            {isViewingLikedPets
                                ? " liked "
                                : " fostered or adopted "}
                            pets
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPets;
