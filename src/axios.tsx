import axios from "axios";

export const myAPI = axios.create({
    baseURL: "https://junxuanb.com/api/",
});