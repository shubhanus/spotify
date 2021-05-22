import spotifyApi, { urls } from "../api";

/**
 * gets spotify featured playlist
 * @returns {Promise<Object[]>}
 */
const getFeaturedPlaylists = () =>
  spotifyApi
    .get(urls.featuredPlaylists)
    .then(({ data }) => data.playlists.items)
    .catch((error) => {
      throw error;
    });

export default getFeaturedPlaylists;
