import { instance } from "../axiosInstance";

export default async function checkIfPetSaved(petsObj, currentUser) {
    for (const id in petsObj) {
        const res = await instance.get(
            `https://thepethaven-be.azurewebsites.net/pet/${id}/save?uid=${currentUser.id}`
        );
        petsObj[id] = {
            ...petsObj[id],
            isSaved: res.data ? true : false,
        };
    }
    return petsObj;
}
