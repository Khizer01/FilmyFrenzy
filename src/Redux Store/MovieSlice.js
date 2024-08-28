import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movies: [],
        loading: false,
        error: false,
        selectedMovie: null,
    },
    reducers: {
        getMovieStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        getMovieSuccess: (state, action) => {
            state.movies = action.payload;
            state.loading = false;
        },
        getMovieFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        setSelectedMovie: (state, action) => {
          state.selectedMovie = action.payload;
        },
        clearMovie: (state) => {
            state.movies = [];
        }
    }
})

export const { getMovieStart, getMovieSuccess, getMovieFail, setSelectedMovie, clearMovie } = movieSlice.actions;

export default movieSlice.reducer;