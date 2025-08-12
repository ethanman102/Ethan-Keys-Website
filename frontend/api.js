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
        const csrf = Cookies.get('csrftoken');
        console.log(document.cookie)
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
        if (error.response && error.response.status === 401){
            if (error.config && error.config.attemptedRefresh) return Promise.reject(error);
            if (!error.config) return Promise.reject(error);

            // reaching here means we are attempting to get a new refresh token...
            error.config.attemptedRefresh = true;
            try{
                await instance.post('/api/refresh/');
                return instance(error.config);
            }catch (invalidRefresh){
                // refresh token has already expired must relogin...
                return Promise.reject(invalidRefresh);
            }
        }
        // reach here meaans we didn't get the refresh
        return Promise.reject(error);
    }
);
export default instance;