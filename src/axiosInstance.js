import axios from "axios";

export const instance = axios.create({
        validateStatus: status => {
            return status < 400;
        },
    });
