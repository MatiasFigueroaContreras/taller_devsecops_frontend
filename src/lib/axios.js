import axios from "axios";
import { getSession } from "next-auth/react";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
});

axiosAuth.interceptors.request.use(async (request) => {
    if(!isAccessTokenAttached())
        await setAccessToken(request);
    return request;
});

const isAccessTokenAttached = () => {
    const authHeader = axiosAuth.defaults.headers.common["Authorization"];
    return (authHeader != null && authHeader != undefined && authHeader != "")
}

const setAccessToken = async (request) => {
    const session = await getSession();
    if (session) {
        const authHeaderValue = `Bearer ${session.user.accessToken}`;
        if (!request.headers) request.headers = {};
        request.headers["Authorization"] = authHeaderValue;
        axiosAuth.defaults.headers.common["Authorization"] = authHeaderValue;
    }
}

export const unsetAccessToken = () => {
    delete axiosAuth.defaults.headers.common["Authorization"];
}
