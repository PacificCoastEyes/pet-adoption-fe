import { instance } from "../axiosInstance";
import { useEffect, useState } from "react";
import PetDetails from "../components/PetDetails";
import { InfoCircleFill } from "react-bootstrap-icons";
import "../styles/Pet.css";

const Pet = ({ title }) => {
    const [petDetails, setPetDetails] = useState({});
    const [petNotFound, setPetNotFound] = useState(false);

    const {
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
    } = petDetails;

    useEffect(() => {
        const fetchPetDetails = async id => {
            try {
                const { data } = await instance.get(
                    `http://localhost:8080/pet/${id}`
                );
                setPetDetails(data);
            } catch (err) {
                console.log(err);
                setPetNotFound(true);
            }
        };

        document.title = title;
        const params = new URL(document.location).searchParams;
        const id = params.get("id");
        if (id) fetchPetDetails(id);
        // eslint-disable-next-line
    }, []);
    return Object.keys(petDetails).length ? (
        <div className="d-flex justify-content-center">
            <PetDetails
                isSaved={uid}
                id={id}
                uid={uid}
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
        </div>
    ) : (
        <div
            className="d-flex justify-content-center align-items-center"
            id="pet-details-placeholder"
        >
            <InfoCircleFill />
            <h1 className="ms-4 mb-0">
                {petNotFound
                    ? "404 Pet Not Found"
                    : "Pet details will appear here"}
            </h1>
        </div>
    );
};

export default Pet;
