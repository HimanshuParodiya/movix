import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
}

export const fetchDataFromApi = async (url,params) =>{
    try {
        const {data}  = await axios.get(baseUrl + url,{ headers: headers, params:params }) //we are destructureing the data and inside get first we have url then we pass and option where we sending the header and params
        return data;
    } catch (error) {
        console.log(error);
        return error
    }

}