/**
 * @description This file contains all the actions that are used in the application. The actions are used to update the state of the application.
 * 
 **/




export const SET_MOVIES = 'SET_MOVIES';
export const SET_DIRECTORS = 'SET_DIRECTORS';
export const SET_GENRES = 'SET_GENRES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';


export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setDirectors(value) {
  return { type: SET_DIRECTORS, value };
}

export function setGenres(value) {
  return { type: SET_GENRES, value };
}


export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}
