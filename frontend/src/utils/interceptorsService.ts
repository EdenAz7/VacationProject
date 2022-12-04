import axios from "axios";
import { store } from "../Redux/Store";

class InterceptorsService {

    public createInterceptors(): void {

        axios.interceptors.request.use((request) => {

            // If we have a token:
            if (store.getState().token) {

                // Add a header to the request sending that token:
                request.headers = {
                    authorization: "Bearer " + store.getState().token
                };
            }

            return request;
        });
    }
}

const interceptorsService = new InterceptorsService();

export default interceptorsService;

