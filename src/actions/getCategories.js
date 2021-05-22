import spotifyApi, { urls } from "../api";

/**
 * gets spotify categories
 * @returns {Promise<Object[]>}
 */
const getCategories = () =>
  spotifyApi
    .get(urls.categories)
    .then(({ data }) => data.categories.items)
    .catch((error) => {
      throw error;
    });

export default getCategories;
