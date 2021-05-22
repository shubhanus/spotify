import axios from "axios";
import { localStorageHelpers } from "../helpers";
import qs from "querystring";
import config from "../config";

/**
 * Send server a token request
 * @param {string} [grant_type="client_credentials"]
 * @returns {Promise<staring>} accessToken
 */
function getAuthTokenFromServer(grant_type = "client_credentials") {
  return axios
    .post(config.api.authUrl, qs.stringify({ grant_type }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: config.api.clientId,
        password: config.api.clientSecret,
      },
    })
    .then((res) => {
      return res.data["access_token"];
    })
    .catch((err) => {
      throw err;
    });
}

const injectInterceptors = (instance) => {
  instance.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      if (!config.headers.Authorization) {
        let token = localStorageHelpers.getAuthToken();
        if (!token) {
          token = await getAuthTokenFromServer(instance);
          localStorageHelpers.setAuthToken(token);
        }
        instance.defaults.headers.Authorization = `Bearer ${token}`;
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      //TODO: add refresh token logic
      return Promise.reject(error);
    }
  );
};

export default injectInterceptors;
