import axios from "axios";
import { apiURL } from "./constants";
import Cookies from "js-cookie";

const instance = axios.create(
    {
        withCredentials: true,
        baseURL: apiURL
    }
);

instance.interceptors.request.use(
    (config) => {
        let csrf = Cookies.get('csrftoken');
        if (csrf) config.headers['X-CSRFToken'] = csrf;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


instance.interceptors.response.use(
    (response) =>{
        return response;
    },
    async (error) =>{
        return Promise.reject(error);
        // TO DO: Refresh cookies and tokens :)
    }
);
export default instance;