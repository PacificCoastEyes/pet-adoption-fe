import { instance } from "../axiosInstance";

export default async function toggleSavePet(
    id,
    name,
    isSaved,
    petState,
    setPetState,
    setShowPetActionToast,
    setTextPetActionToast
) {
    try {
        !isSaved &&
            (await instance.post(`http://localhost:8080/pet/${id}/save`));
        isSaved &&
            (await instance.delete(`http://localhost:8080/pet/${id}/save`));
        setPetState({
            ...petState,
            [id]: { ...petState[id], isSaved: isSaved ? false : true },
        });

        setTextPetActionToast(
            `${name} has been ${
                isSaved ? "removed from" : "added to"
            } your saved pets.`
        );
    } catch (err) {
        setTextPetActionToast(
            `Sorry, we ran into a problem ${
                isSaved ? "removing" : "adding"
            } ${name} ${isSaved ? "from" : "to"} your saved pets.`
        );
    } finally {
        setShowPetActionToast(true);
    }
}
