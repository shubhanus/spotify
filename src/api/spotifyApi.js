import axios from "axios";
import config from "../config";
import injectInterceptors from "./interceptors";

const spotifyApi = axios.create({
  baseURL: config.api.baseUrl,
});

injectInterceptors(spotifyApi);

export default spotifyApi;
