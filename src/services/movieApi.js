import axios from "axios";

export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=57fac967`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?i=${id}&apikey=57fac967`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};