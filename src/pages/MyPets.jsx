import { useCallback, useContext, useEffect } from "react";
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
        savedPets,
        setSavedPets,
        ownedPets,
        setOwnedPets,
        isViewingSavedPets,
        setIsViewingSavedPets,
    } = useContext(PetContext);
    const { currentUser } = useContext(UserContext);

    const getPets = useCallback(async () => {
        let queryUrl = `https://thepethaven-be.azurewebsites.net/pet/user/${
            currentUser.id
        }${isViewingSavedPets ? "?savedPets=true" : ""}`;
        const res = await instance.get(queryUrl);
        let petsObj = {};
        for (const pet of res.data) {
            petsObj[pet.id] = { ...pet };
        }
        petsObj = await checkIfPetSaved(petsObj, currentUser);
        if (isViewingSavedPets) {
            setSavedPets(petsObj);
        } else {
            setOwnedPets(petsObj);
        }
    }, [currentUser, isViewingSavedPets, setOwnedPets, setSavedPets]);

    useEffect(() => {
        document.title = title;
        getPets();
    }, [isViewingSavedPets, getPets, title]);

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
                    {isViewingSavedPets
                        ? "Saved Pets"
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
                        checked={isViewingSavedPets}
                        onChange={() =>
                            setIsViewingSavedPets(!isViewingSavedPets)
                        }
                    />
                    <label htmlFor="my-pets-toggle">Saved Pets</label>
                </Form.Group>
            </div>
            <div className="d-flex flex-wrap mt-3" id="my-pets-container">
                {Object.keys(isViewingSavedPets ? savedPets : ownedPets)
                    .length > 0 ? (
                    Object.values(
                        isViewingSavedPets ? savedPets : ownedPets
                    ).map(item => {
                        const { id } = item;
                        return (
                            <PetCard
                                key={id}
                                id={id}
                                referrer={
                                    isViewingSavedPets ? "saved" : "owned"
                                }
                            />
                        );
                    })
                ) : (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        id="my-pets-placeholder"
                    >
                        {isViewingSavedPets ? (
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
                            {isViewingSavedPets
                                ? " saved "
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
