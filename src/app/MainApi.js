import axios from "axios"
import { BASE_URL } from "./url"

export const MainApi = axios.create(
    {
        baseURL:`${BASE_URL}`
    }
);