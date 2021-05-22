import spotifyApi, { urls } from "../api";

/**
 * gets spotify new releases
 * @returns {Promise<Object[]>}
 */
const getNewReleases = () =>
  spotifyApi
    .get(urls.newReleases)
    .then(({ data }) => data.albums.items)
    .catch((error) => {
      throw error;
    });

export default getNewReleases;
